<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'connection.php';

try {
    $patientCode = $_GET['patientCode'] ?? null;
    $prevStatus  = $_GET['prevStatus'] ?? null;
    $newStatus   = $_GET['newStatus'] ?? null;

    if (!$patientCode || !$prevStatus || !$newStatus) {
        echo json_encode(['status' => 'error', 'message' => 'Parâmetros inválidos']);
        exit;
    }

    // 1. Buscar código da sessão
    $getSessionCode = $conn->prepare('SELECT sesCodigo FROM sessao WHERE sesPacCodigo = ?');
    $getSessionCode->execute([$patientCode]);
    $getSession = $getSessionCode->fetch(PDO::FETCH_ASSOC);

    if (!$getSession || empty($getSession['sesCodigo'])) {
        echo json_encode(['status' => 'error', 'message' => 'Sessão não encontrada']);
        exit;
    }

    $sesCodigo = $getSession['sesCodigo'];

    // 2. Determinar delta, recalcular e extraDay
    $delta = 0;
    $recalcular = false;
    $extraDay = false;

    if ($prevStatus === 'pending' && $newStatus === 'confirmed') {
        $delta = -1; // confirmado direto → remove 1 sessão
        $recalcular = false;
    } elseif ($prevStatus === 'pending' && $newStatus === 'destructive') {
        $delta = +1; // soma 1 sessão
        $recalcular = true;
        $extraDay = true; // adiciona 1 dia extra
    } elseif ($prevStatus === 'destructive' && $newStatus === 'confirmed') {
        $delta = -1; // remove a sessão que foi adicionada
        $recalcular = true;
        $extraDay = false; // não precisa adicionar dia extra
    } elseif ($prevStatus === 'confirmed' && $newStatus === 'destructive') {
        $delta = +1; // soma 1 sessão
        $recalcular = true;
        $extraDay = true;
    }

    // 3. Atualizar quantidade de sessões se necessário
    if ($delta !== 0) {
        $updateStmt = $conn->prepare('
            UPDATE diahoraagendado
            SET diaQtdSessao = diaQtdSessao + ?
            WHERE diaSesCodigo = ?
        ');
        $updateStmt->execute([$delta, $sesCodigo]);
    }

    // 4. Se precisa recalcular, buscar dados e refazer agenda
    if ($recalcular) {
        $infoStmt = $conn->prepare('
            SELECT d.diaQtdSessao, d.diaCodigo
            FROM diahoraagendado d
            WHERE d.diaSesCodigo = ?
        ');
        $infoStmt->execute([$sesCodigo]);
        $allInfo = $infoStmt->fetch(PDO::FETCH_ASSOC);

        if (!$allInfo) {
            echo json_encode(['status' => 'error', 'message' => 'Dados não encontrados (diahoraagendado)']);
            exit;
        }

        $formQtd   = (int)$allInfo['diaQtdSessao'];
        $dayCode   = $allInfo['diaCodigo'];

        // Buscar dias válidos
        $daysStmt = $conn->prepare('
            SELECT diaSegunda, diaTerca, diaQuarta, diaQuinta, diaSexta
            FROM diahoraagendado
            WHERE diaCodigo = ?
        ');
        $daysStmt->execute([$dayCode]);
        $formDays = $daysStmt->fetch(PDO::FETCH_ASSOC);

        if (!$formDays) {
            echo json_encode(['status' => 'error', 'message' => 'Dias válidos não encontrados (dia)']);
            exit;
        }

        foreach ($formDays as $k => $v) {
            $formDays[$k] = (int)$v;
        }

        $newDates = [];
        $currentDate = new DateTime();
        $currentDate->modify('+1 day'); // começa amanhã

        $map = [
            'monday'    => 'diaSegunda',
            'tuesday'   => 'diaTerca',
            'wednesday' => 'diaQuarta',
            'thursday'  => 'diaQuinta',
            'friday'    => 'diaSexta'
        ];

        while (count($newDates) < $formQtd) {
            $dayName = strtolower($currentDate->format('l'));
            $col = $map[$dayName];
            if (!empty($formDays[$col])) {
                $newDates[] = $currentDate->format('Y-m-d');
            }
            $currentDate->modify('+1 day');
        }

        // Se ausente hoje (pending -> destructive), adiciona mais um dia válido e insere direto
        if ($extraDay) {
            $lastDate = end($newDates);
            $currentDate = new DateTime($lastDate);
            $currentDate->modify('+1 day');

            while (true) {
                $dayName = strtolower($currentDate->format('l'));
                $col = $map[$dayName];
                if (!empty($formDays[$col])) {
                    $extraDate = $currentDate->format('Y-m-d');
                    
                    // só adiciona se não estiver já na lista
                    if (!in_array($extraDate, $newDates, true)) {
                        $newDates[] = $extraDate;

                        // insere direto no banco
                        $addStmt = $conn->prepare('
                            INSERT INTO consulta (conDiaCodigo, conDiaAgendado) VALUES (?,?)
                        ');
                        $addStmt->execute([$dayCode, $extraDate]);

                        error_log("ExtraDay inserido: $extraDate");
                        break;
                    }
                }
                $currentDate->modify('+1 day');
            }
        }

        // Excluir consultas futuras que não batem
        $today = (new DateTime())->format('Y-m-d');
        $getConsultasStmt = $conn->prepare('
            SELECT conCodigo, conDiaAgendado
            FROM consulta
            WHERE conDiaCodigo = ? AND conDiaAgendado >= ?
        ');
        $getConsultasStmt->execute([$dayCode, $today]);
        $consultas = $getConsultasStmt->fetchAll(PDO::FETCH_ASSOC);

        $targetSet = array_flip($newDates);

        foreach ($consultas as $consulta) {
            if (!isset($targetSet[$consulta['conDiaAgendado']])) {
                $delStmt = $conn->prepare('DELETE FROM consulta WHERE conCodigo = ?');
                $delStmt->execute([$consulta['conCodigo']]);
            }
        }

        // Inserir consultas faltantes
        foreach ($newDates as $date) {
            $checkStmt = $conn->prepare('
                SELECT COUNT(*) FROM consulta WHERE conDiaCodigo = ? AND conDiaAgendado = ?
            ');
            $checkStmt->execute([$dayCode, $date]);
            $exists = (int)$checkStmt->fetchColumn();

            if ($exists === 0) {
                $addStmt = $conn->prepare('
                    INSERT INTO consulta (conDiaCodigo, conDiaAgendado) VALUES (?,?)
                ');
                $addStmt->execute([$dayCode, $date]);
            }
        }
    }

    echo json_encode(['status' => 'success', 'message' => 'Sessões atualizadas e agenda recalculada']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
