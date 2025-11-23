<?php
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    require_once 'connection.php';

    date_default_timezone_set(	'America/Sao_Paulo');

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

    //Set all prepares
    $getDiaHoraAgendadoStmt = $conn->prepare("SELECT * FROM diaHoraAgendado WHERE diaCodigo = ?");
    $getSessaoStmt = $conn->prepare("SELECT * FROM sessao WHERE sesCodigo = ?");
    $getPacienteStmt = $conn->prepare("SELECT * FROM paciente WHERE pacCodigo = ?");

    try{
        //get everything from diaHoraAgendado
        foreach($getConsulta as $gC){
            $getDiaHoraAgendadoStmt->execute([$gC['conDiaCodigo']]);
            $getDiaHoraAgendado = $getDiaHoraAgendadoStmt->fetchAll(PDO::FETCH_ASSOC);
            
            //get everything from sessao
            foreach($getDiaHoraAgendado as $gD){
                $getSessaoStmt->execute([$gD['diaSesCodigo']]);
                $getSessao = $getSessaoStmt->fetchAll(PDO::FETCH_ASSOC);

                //get everything from paciente
                foreach($getSessao as $gS){
                    $patientFk = $gS['sesPacCodigo'] ?? null;
                    if (!$patientFk) continue;
                    
                    $getPacienteStmt->execute([$patientFk]);
                    $getPaciente = $getPacienteStmt->fetchAll(PDO::FETCH_ASSOC);

                    //adjust infos into an array
                    foreach($getPaciente as $gP){
                        //format hour into HH:MM
                        $timeFormatted = $gD['diaHorario'] ?? null;
                        if ($timeFormatted) {
                            $timeParts = explode(':', $timeFormatted);
                            $timeFormatted = $timeParts[0] . ':' . $timeParts[1]; // HH:MM
                        }

                        //format display info
                        $superior = ($gS['sesParteSuperior'] === 1) ? "Superior" : null;
                        $inferior = ($gS['sesParteInferior'] === 1) ? "Inferior" : null;
                        $back = ($gS['sesColuna'] === 1) ? "Coluna" : null;
                        if($superior !== null && $inferior !== null){ $superior = $superior.', '; }
                        if($superior !== null && $back !== null){ $superior = $superior.', '; }
                        if($inferior !== null && $back !== null){ $inferior = $inferior.', '; }

                        //array
                        $dataObject = [
                            'consultaCode' => $gC['conCodigo'] ?? 0,
                            'patientCode' => $gP['pacCodigo'] ?? 0,
                            'patientLevel' => $gP['pacNivelImportancia'] ?? 0,
                            'day' => $gC['conDiaAgendado'] ?? null,
                            'dayStatus' => $gC['conStatusDiaAgendado'] ?? null, //If patient was present on that day
                            'time' => $timeFormatted,
                            'superior' => $superior,
                            'inferior' => $inferior,
                            'back' => $back,
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

    //filter by hour
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

    try{

        $getAllTodaySessionsStmt = $conn->prepare("SELECT s.*, p.pacCodigo, p.pacNivelImportancia, p.pacNome FROM sessao AS s INNER JOIN paciente AS p ON s.sesPacCodigo = p.pacCodigo WHERE sesDtAvaliacao >= CURDATE() AND sesDtAvaliacao < CURDATE() + INTERVAL 1 DAY;");
        $getAllTodaySessionsStmt->execute();
        $getAllTodaySessions = $getAllTodaySessionsStmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($getAllTodaySessions as $session) {
            $superior = ($session['sesParteSuperior'] == 1) ? "Superior" : null;
            $inferior = ($session['sesParteInferior'] == 1) ? "Inferior" : null;
            $back     = ($session['sesColuna'] == 1) ? "Coluna" : null;

            $dataObject = [
                'consultaCode' => null,
                'patientCode' => $session['pacCodigo'] ?? 0,
                'patientLevel' => $session['pacNivelImportancia'] ?? 0,
                'day' => $session['sesDtAvaliacao'] ? (new DateTime($session['sesDtAvaliacao']))->format('Y-m-h') : $currentDay,
                'dayStatus' => null,
                'time' => $session['sesDtAvaliacao'] ? (new DateTime($session['sesDtAvaliacao']))->format('H:i') : null,
                'superior' => $superior,
                'inferior' => $inferior,
                'back' => $back,
                'name' => $session['pacNome'] ?? null,
            ];
            $filteredDataObject[] = $dataObject;
        }

    }catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT from diaHoraAgendado (getPatientData)']);
        exit();
    }

    //sort by hour from early to later
    usort($filteredDataObject, function($a, $b){
        $ta = isset($a['time']) ? strtotime($a['time']) : PHP_INT_MAX;
        $tb = isset($b['time']) ? strtotime($b['time']) : PHP_INT_MAX;
        return $ta <=> $tb;
    });

    echo json_encode(['status' => 'success', 'data' => $filteredDataObject]);