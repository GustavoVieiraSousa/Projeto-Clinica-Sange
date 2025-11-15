<?php
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    require_once 'connection.php';

    $timeFilter = isset($_GET['timeFilter']) ? $_GET['timeFilter'] : 'all';
    $currentDay = date('Y-m-d');

    $filteredDataObject = [];

    //SELECT from consulta
    try{
        $getConsultaStmt = $conn->prepare("SELECT * FROM consulta WHERE conDiaAgendado = ?");
        $getConsultaStmt->execute([$currentDay]);
        $getConsulta = $getConsultaStmt->fetchAll(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT from consulta (getPatientData)']);
        exit();
    }

    //SELECT from diaHoraAgendado

    $getDiaHoraAgendadoStmt = $conn->prepare("SELECT * FROM diaHoraAgendado WHERE diaCodigo = ?");
    $getSessaoStmt = $conn->prepare("SELECT * FROM sessao WHERE sesCodigo = ?");
    $getPacienteStmt = $conn->prepare("SELECT * FROM paciente WHERE pacCodigo = ?");

    try{
        foreach($getConsulta as $gC){
            $getDiaHoraAgendadoStmt->execute([$gC['conDiaCodigo']]);
            $getDiaHoraAgendado = $getDiaHoraAgendadoStmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach($getDiaHoraAgendado as $gD){
                $getSessaoStmt->execute([$gD['diaSesCodigo']]);
                $getSessao = $getSessaoStmt->fetchAll(PDO::FETCH_ASSOC);

                foreach($getSessao as $gS){
                    $patientFk = $gS['sesPacCodigo'] ?? null;
                    if (!$patientFk) continue;
                    
                    $getPacienteStmt->execute([$patientFk]);
                    $getPaciente = $getPacienteStmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach($getPaciente as $gP){
                        $dataObject = [
                            'patientCode' => $gC['conCodigo'] ?? 0,
                            'day' => $gC['conDiaAgendado'] ?? null,
                            'dayStatus' => $gC['conStatusDiaAgendado'] ?? null, //If patient was present on that day
                            'time' => $gD['diaHorario'] ?? null,
                            'superior' => $gS['sesParteSuperior'] ?? 0,
                            'inferior' => $gS['sesParteInferior'] ?? 0,
                            'back' => $gS['sesColuna'] ?? 0,
                            'name' => $gP['pacNome'] ?? null
                        ];
                        $filteredDataObject[] = $dataObject;
                    }
                }
            }
        }    
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT from diaHoraAgendado (getPatientData)']);
        exit();
    }

    if ($timeFilter !== 'all') {
        $filtered = [];
        foreach ($filteredDataObject as $fDO) {
            $parts = explode(':', $fDO['time']);
            $hour = intval($parts[0] ?? 0);

            if ($timeFilter === 'morning' && $hour >= 6 && $hour < 12) $filtered[] = $fDO;
            elseif ($timeFilter === 'afternoon' && $hour >= 12 && $hour < 18) $filtered[] = $fDO;
            elseif ($timeFilter === 'night' && $hour >= 18 && $hour < 24) $filtered[] = $fDO;
        }
        $filteredDataObject = $filtered;
    }

    usort($filteredDataObject, function($a, $b){
        $ta = isset($a['time']) ? strtotime($a['time']) : PHP_INT_MAX;
        $tb = isset($b['time']) ? strtotime($b['time']) : PHP_INT_MAX;
        return $ta <=> $tb;
    });

    // var_dump($getDiaHoraAgendado);

    echo json_encode(['status' => 'success', 'data' => $filteredDataObject]);