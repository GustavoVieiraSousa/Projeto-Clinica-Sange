<?php 

    header("Access-Control-Allow-Origin: *");   
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
    require_once 'connection.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $allInfo = $data['data'];

    if ($allInfo === null || !isset($allInfo)) {
        echo json_encode(['error' => 'Invalid data received']);
        exit();
    }

    function normalizeFloat($value) {
        return (float) str_replace(',', '.', $value);
    }

    // ----------------------- TREATMENT ------------------------
    $avaliationDay = $allInfo['avaliationDay'];
    $formatedATime = (new DateTime($avaliationDay))->format('Y-m-d H:i:s');

    //SEARCH 29 MINUTES BEHIND CURRENT TIME TO SEE IF THERE'S ANY AVALIATIONS, IF SO, DOES NOT ALLOW TO CREATE PATIENT.

    try{
        $getADayDBStmt = $conn->prepare("SELECT s.sesDtAvaliacao FROM sessao AS s WHERE s.sesDtAvaliacao >= CURDATE() AND s.sesDtAvaliacao < CURDATE() + INTERVAL 1 DAY AND s.sesDtAvaliacao BETWEEN DATE_SUB(?, INTERVAL 29 MINUTE) AND DATE_ADD(?, INTERVAL 29 MINUTE);");
        $getADayDBStmt->execute([$formatedATime, $formatedATime]);
        $getADayDB = $getADayDBStmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (!empty($getADayDB)) {
            echo json_encode(['status' => 'error', 'message' => 'Data da avaliação não disponível']);
            exit();
        }
    }
    catch(PDOException $e){
        echo json_encode(['error' => 'Something went wrong -> Treatment: ', $e]);
        exit();
    }

    try{
        // -------------------- PACIENTE --------------------
        $addPacienteStmt = $conn->prepare('
            INSERT INTO paciente (
                pacNumCarteirinha, pacTipoConvenio, pacDesativado, pacDtDesativado,
                pacNome, pacDtNascimento, pacSexo, pacEstadoCivil, pacPeso, pacAltura,
                pacFumante, pacNivelImportancia, pacEmail, pacTelefone, pacCpf
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ');

        $weight = normalizeFloat($allInfo['weight']);
        $height = normalizeFloat($allInfo['height']);

        $addPacienteStmt->execute([
            $allInfo['cardNumber'],
            $allInfo['agreement'],
            0,    // pacDesativado default
            null, // pacDtDesativado
            $allInfo['name'],
            $allInfo['birthDate'],
            $allInfo['gender'],
            $allInfo['maritalStatus'],
            $weight,
            $height,
            $allInfo['smoker'] ? 1 : 0,
            2, // sempre criar usuario como Avaliacao
            $allInfo['email'],
            $allInfo['phone'],
            $allInfo['cpf']
        ]);


        $patientId = $conn->lastInsertId();

        // -------------------- ENDEREÇO --------------------
        $addEnderecoStmt = $conn->prepare('
            INSERT INTO endereco (
                endPacCodigo, endCEP, endRua, endBairro, endCidade, endNumero, endComplemento
            ) VALUES (?,?,?,?,?,?,?)
        ');

        $addEnderecoStmt->execute([
            $patientId,
            $allInfo['addressCEP'],
            $allInfo['addressStreet'],
            $allInfo['addressNeighborhood'],
            $allInfo['city'],
            $allInfo['addressNumber'],
            $allInfo['addressComplement']
        ]);

        // -------------------- SESSÃO --------------------
        $addSessaoStmt = $conn->prepare('
            INSERT INTO sessao (
                sesPacCodigo, sesParteSuperior, sesParteInferior, sesColuna,
                sesGravidadePSuperior, sesGravidadePInferior, sesGravidadeColuna,
                sesDescricao, sesUltimaEdicao, sesDtAvaliacao
            ) VALUES (?,?,?,?,?,?,?,?,?,?)
        ');

        $addSessaoStmt->execute([
            $patientId,
            $allInfo['upperPain'],
            $allInfo['lowerPain'],
            $allInfo['backPain'],
            $allInfo['upperPainDesc'],
            $allInfo['lowerPainDesc'],
            $allInfo['backPainDesc'],
            $allInfo['observations'],
            $allInfo['lastEditedBy'],
            $allInfo['avaliationDay']
        ]);


        $sessionId = $conn->lastInsertId();

        // -------------------- PATOLOGIA --------------------
        $addPatologiaStmt = $conn->prepare('
            INSERT INTO patologia (
                patSesCodigo, patDiagnosticoClinico, patHMA, patAntecedentesPessoais,
                patPatologiaAssociada, patTomaMedicamento, patQuandoDorComecou,
                patQualPosicaoDorMaisIntensa, patQualPosicaoTrabalho, patFezCirurgia,
                patDataCirurgia, patExamesComplementares, patHaComprometimentoAVS,
                patLimitacaoFuncional, patComprometimentoMarcha
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ');

        $addPatologiaStmt->execute([
            $sessionId,
            $allInfo['clinicalDiagnosis'],
            $allInfo['hma'],
            $allInfo['personalHistory'],
            $allInfo['associatedPathology'],
            $allInfo['medication'],
            $allInfo['painStart'],
            $allInfo['painPosition'],
            $allInfo['workPosition'],
            $allInfo['surgery'],
            $allInfo['surgeryDate'],
            $allInfo['complementaryExams'],
            $allInfo['avsCompromise'],
            $allInfo['functionalLimitation'],
            $allInfo['gaitCompromise']
        ]);

        // -------------------- EXAME FÍSICO --------------------
        $addExameStmt = $conn->prepare('
            INSERT INTO examefisico (
                exaSesCodigo, exaPA, exaFR, exaFC, exaInspecao, exaPalpacao,
                exaDorPalpacao, exaDorPalpacaoDesc, exaEdema, exaEdemaDesc,
                exaTestesEspecificos, exaADM, exaADMDesc, exaFM, exaFMDesc,
                exaTonusMuscular, exaTonusMuscularDesc, exaMovimento,
                exaFazUsoOrtese, exaFazUsoOrteseDesc, exaDesviosPosturais, exaDesviosPosturaisDesc
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ');

        $addExameStmt->execute([
            $sessionId,
            $allInfo['bloodPressure'],
            $allInfo['respiratoryRate'],
            $allInfo['heartRate'],
            $allInfo['inspection'],
            $allInfo['palpation'],
            $allInfo['palpationPain'] ? 1 : 0,
            $allInfo['palpationPain'] ? $allInfo['palpation'] : null,
            $allInfo['edema'] ? 1 : 0,
            $allInfo['edema'] ? $allInfo['edemaDesc'] : null,
            $allInfo['specificTests'],
            $allInfo['adm'],
            $allInfo['admDesc'] ?? null,
            $allInfo['fm'],
            $allInfo['fmDesc'] ?? null,
            $allInfo['muscleTone'],
            $allInfo['muscleToneDesc'] ?? null,
            $allInfo['movement'],
            $allInfo['orthesisUse'] ? 1 : 0,
            $allInfo['orthesisType'],
            $allInfo['posturalDeviations'] ? 1 : 0,
            $allInfo['posturalDeviationsDescription']
        ]);

        // -------------------- TRATAMENTO FISIOTERÁPICO --------------------
        $addTratamentoStmt = $conn->prepare('
            INSERT INTO tratamentofisioterapico (
                traSesCodigo, traObjetivoTratamento, traTratamentoProposto
            ) VALUES (?,?,?)
        ');

        $addTratamentoStmt->execute([
            $sessionId,
            $allInfo['treatmentObjectives'],
            $allInfo['proposedTreatment']
        ]);


        // -------------------- DIA/HORA AGENDADO PRECISA FICAR ANTES DE CONSULTA -------------------------

        // -------------------- DIA/HORA AGENDADO --------------------
        $addDiaHoraStmt = $conn->prepare('
            INSERT INTO diahoraagendado (
                diaSesCodigo, diaSegunda, diaTerca, diaQuarta, diaQuinta, diaSexta,
                diaQtdSessao, diaTotalSessao, diaHorario, diaDtInicioSessao
            ) VALUES (?,?,?,?,?,?,?,?,?,?)
        ');

        $addDiaHoraStmt->execute([
            $sessionId,
            $allInfo['segundaFeira'] ? 1 : 0,
            $allInfo['tercaFeira'] ? 1 : 0,
            $allInfo['quartaFeira'] ? 1 : 0,
            $allInfo['quintaFeira'] ? 1 : 0,
            $allInfo['sextaFeira'] ? 1 : 0,
            $allInfo['QTDsessao'],
            $allInfo['QTDsessao'], // diaTotalSessao
            $allInfo['horarioSessao'],
            $allInfo['dayStartTreatment'],
        ]);

        $dayId = $conn->lastInsertId();

        //--------------------- CRIAR CONSULTAS --------------------
        $startDate   = new DateTime($allInfo['dayStartTreatment']); 
        $totalSessao = (int)$allInfo['QTDsessao'];

        $daysSelected = [
            'Monday'    => !empty($allInfo['segundaFeira']),
            'Tuesday'   => !empty($allInfo['tercaFeira']),
            'Wednesday' => !empty($allInfo['quartaFeira']),
            'Thursday'  => !empty($allInfo['quintaFeira']),
            'Friday'    => !empty($allInfo['sextaFeira']),
        ];

        $resultDates = [];
        $currentDate = clone $startDate;

        $addConsultaStmt = $conn->prepare('
            INSERT INTO consulta (
                conDiaCodigo, conDiaAgendado
            ) VALUES (?,?)
        ');

        while (count($resultDates) < $totalSessao) {
            $dayName = $currentDate->format('l'); // "Monday", "Tuesday" etc.

            if (!empty($daysSelected[$dayName])) {
                $rDate = $currentDate->format('Y-m-d');
                $resultDates[] = $rDate;

                $addConsultaStmt->execute([
                    $dayId,
                    $rDate
                ]);
            }

            // advance 1 day
            $currentDate->modify('+1 day');
        }
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', $e]);
        exit();
    }
    

    echo json_encode(['status' => 'success', 'data' => $allInfo]);
