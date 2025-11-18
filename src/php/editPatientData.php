<?php 

    header("Access-Control-Allow-Origin: *");   
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
    require_once 'connection.php';

    $a = "patientCode recebido via GET: " . var_export($_GET['patientCode'], true);

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $patientCode = isset($_GET['patientCode']) ? $_GET['patientCode'] : 'unknown';
    $sessionCode = isset($_GET['sessionCode']) ? $_GET['sessionCode'] : 'unknown';
    $allInfo = $data['data'];

    // ====================== TREATMENTS ===================== //
    if($patientCode === 'unknown' || $sessionCode === 'unknown'){
        echo json_encode(['status' => 'error']);
        exit();
    }
    if ($allInfo === null || !isset($allInfo)) {
        echo json_encode(['error' => 'Invalid data received']);
        exit();
    }
    // ======================================================= //

    function normalizeFloat($value) {
        return (float) str_replace(',', '.', $value);
    }

    $weight = normalizeFloat($allInfo['weight']);
    $height = normalizeFloat($allInfo['height']);

    try{
        // -------------------- PACIENTE --------------------
        $updatePacienteStmt = $conn->prepare('
            UPDATE paciente SET
                pacNumCarteirinha = ?,
                pacTipoConvenio = ?,
                pacDesativado = ?,
                pacDtDesativado = ?,
                pacNome = ?,
                pacDtNascimento = ?,
                pacSexo = ?,
                pacEstadoCivil = ?,
                pacPeso = ?,
                pacAltura = ?,
                pacFumante = ?,
                pacNivelImportancia = ?,
                pacEmail = ?,
                pacTelefone = ?,
                pacCpf = ?
            WHERE pacCodigo = ?
            ');

            $updatePacienteStmt->execute([
                $allInfo['cardNumber'],
                $allInfo['agreement'],
                0,
                null,
                $allInfo['name'],
                $allInfo['birthDate'],
                $allInfo['gender'],
                $allInfo['maritalStatus'],
                $weight,
                $height,
                $allInfo['smoker'] ? 1 : 0,
                2,
                $allInfo['email'],
                $allInfo['phone'],
                $allInfo['cpf'],
            $patientCode // chave primária
        ]);

        // -------------------- ENDEREÇO --------------------
        $updateEnderecoStmt = $conn->prepare('
            UPDATE endereco SET
                endCEP = ?,
                endRua = ?,
                endBairro = ?,
                endCidade = ?,
                endNumero = ?,
                endComplemento = ?
            WHERE endPacCodigo = ?
            ');

            $updateEnderecoStmt->execute([
                $allInfo['addressCEP'],
                $allInfo['addressStreet'],
                $allInfo['addressNeighborhood'],
                $allInfo['city'],
                $allInfo['addressNumber'],
                $allInfo['addressComplement'],
            $patientCode
        ]);


        // -------------------- SESSÃO --------------------
        $updateSessaoStmt = $conn->prepare('
            UPDATE sessao SET
                sesParteSuperior = ?,
                sesParteInferior = ?,
                sesColuna = ?,
                sesGravidadePSuperior = ?,
                sesGravidadePInferior = ?,
                sesGravidadeColuna = ?,
                sesDescricao = ?,
                sesUltimaEdicao = ?,
                sesDtAvaliacao = ?
            WHERE sesPacCodigo = ?
        ');

        $updateSessaoStmt->execute([
            $allInfo['upperPain'],
            $allInfo['lowerPain'],
            $allInfo['backPain'],
            $allInfo['upperPainDesc'],
            $allInfo['lowerPainDesc'],
            $allInfo['backPainDesc'],
            $allInfo['observations'],
            $allInfo['lastEditedBy'],
            $allInfo['avaliationDay'],
        $patientCode
        ]);


        // -------------------- PATOLOGIA --------------------
        $updatePatologiaStmt = $conn->prepare('
            UPDATE patologia SET
                patDiagnosticoClinico = ?,
                patHMA = ?,
                patAntecedentesPessoais = ?,
                patPatologiaAssociada = ?,
                patTomaMedicamento = ?,
                patQuandoDorComecou = ?,
                patQualPosicaoDorMaisIntensa = ?,
                patQualPosicaoTrabalho = ?,
                patFezCirurgia = ?,
                patDataCirurgia = ?,
                patExamesComplementares = ?,
                patHaComprometimentoAVS = ?,
                patLimitacaoFuncional = ?,
                patComprometimentoMarcha = ?
            WHERE patSesCodigo = ?
        ');

        $updatePatologiaStmt->execute([
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
            $allInfo['gaitCompromise'],
        $sessionCode
        ]);


        // -------------------- EXAME FÍSICO --------------------
        $updateExameStmt = $conn->prepare('
            UPDATE examefisico SET
                exaPA = ?,
                exaFR = ?,
                exaFC = ?,
                exaInspecao = ?,
                exaPalpacao = ?,
                exaDorPalpacao = ?,
                exaDorPalpacaoDesc = ?,
                exaEdema = ?,
                exaEdemaDesc = ?,
                exaTestesEspecificos = ?,
                exaADM = ?,
                exaADMDesc = ?,
                exaFM = ?,
                exaFMDesc = ?,
                exaTonusMuscular = ?,
                exaTonusMuscularDesc = ?,
                exaMovimento = ?,
                exaFazUsoOrtese = ?,
                exaFazUsoOrteseDesc = ?,
                exaDesviosPosturais = ?,
                exaDesviosPosturaisDesc = ?
            WHERE exaSesCodigo = ?
        ');

        $updateExameStmt->execute([
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
            $allInfo['posturalDeviationsDescription'],
            $sessionCode
        ]);


        // -------------------- TRATAMENTO FISIOTERÁPICO --------------------
        $updateTratamentoStmt = $conn->prepare('
            UPDATE tratamentofisioterapico SET
                traObjetivoTratamento = ?,
                traTratamentoProposto = ?
            WHERE traSesCodigo = ?
        ');

        $updateTratamentoStmt->execute([
            $allInfo['treatmentObjectives'],
            $allInfo['proposedTreatment'],
            $sessionCode
        ]);


        // -------------------- DIA/HORA AGENDADO PRECISA FICAR ANTES DE CONSULTA -------------------------

        // -------------------- DIA/HORA AGENDADO --------------------
        $updateDiaHoraStmt = $conn->prepare('
            UPDATE diahoraagendado SET
                diaSegunda = ?,
                diaTerca = ?,
                diaQuarta = ?,
                diaQuinta = ?,
                diaSexta = ?,
                diaQtdSessao = ?,
                diaTotalSessao = ?,
                diaHorario = ?,
                diaDtInicioSessao = ?
            WHERE diaSesCodigo = ?
        ');

        $updateDiaHoraStmt->execute([
            $allInfo['segundaFeira'] ? 1 : 0,
            $allInfo['tercaFeira'] ? 1 : 0,
            $allInfo['quartaFeira'] ? 1 : 0,
            $allInfo['quintaFeira'] ? 1 : 0,
            $allInfo['sextaFeira'] ? 1 : 0,
            $allInfo['QTDsessao'],
            $allInfo['QTDsessao'],
            $allInfo['horarioSessao'],
            $allInfo['dayStartTreatment'],
            $sessionCode
        ]);

        $getDayCodeStmt = $conn->prepare('SELECT diaCodigo FROM diaHoraAgendado WHERE diaSesCodigo = ?');
        $getDayCodeStmt->execute([$sessionCode]);
        $dayCode = $getDayCodeStmt->fetch(PDO::FETCH_ASSOC);

        //--------------------- CRIAR CONSULTAS --------------------
        // 1. Buscar dados atuais do banco
        $getDiaHoraStmt = $conn->prepare('
            SELECT diaSegunda, diaTerca, diaQuarta, diaQuinta, diaSexta,
                diaQtdSessao, diaDtInicioSessao
            FROM diahoraagendado
            WHERE diaSesCodigo = ?
        ');
        $getDiaHoraStmt->execute([$sessionCode]);
        $dbDiaHora = $getDiaHoraStmt->fetch(PDO::FETCH_ASSOC);

        if ($dbDiaHora) {
            // 2. Normalizar valores do formulário
            $formDays = [
                'Monday'    => $allInfo['segundaFeira'] ? 1 : 0,
                'Tuesday'   => $allInfo['tercaFeira'] ? 1 : 0,
                'Wednesday' => $allInfo['quartaFeira'] ? 1 : 0,
                'Thursday'  => $allInfo['quintaFeira'] ? 1 : 0,
                'Friday'    => $allInfo['sextaFeira'] ? 1 : 0,
            ];

            $dbDays = [
                'Monday'    => (int)$dbDiaHora['diaSegunda'],
                'Tuesday'   => (int)$dbDiaHora['diaTerca'],
                'Wednesday' => (int)$dbDiaHora['diaQuarta'],
                'Thursday'  => (int)$dbDiaHora['diaQuinta'],
                'Friday'    => (int)$dbDiaHora['diaSexta'],
            ];

            $formQtd = (int)$allInfo['QTDsessao']; // quantidade nova
            $dbQtd   = (int)$dbDiaHora['diaQtdSessao'];

            // 3. Verificar se houve mudança
            if ($formDays != $dbDays || $formQtd != $dbQtd) {
                // 4. Recalcular novas datas
                $startDate   = new DateTime($allInfo['avaliationDay']); // dia da avaliação
                $totalSessao = $formQtd;

                $newDates = [];
                $currentDate = clone $startDate;

                while (count($newDates) < $totalSessao) {
                    $dayName = $currentDate->format('l');
                    if (!empty($formDays[$dayName])) {
                        $newDates[] = $currentDate->format('Y-m-d');
                    }
                    $currentDate->modify('+1 day');
                }

                // 5. Excluir consultas futuras que não batem
                $today = (new DateTime())->format('Y-m-d');

                $getConsultasStmt = $conn->prepare('
                    SELECT conCodigo, conDiaAgendado
                    FROM consulta
                    WHERE conDiaCodigo = ? AND conDiaAgendado >= ?
                ');

                $getConsultasStmt->execute([$dayCode['diaCodigo'], $today]);
                $consultas = $getConsultasStmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($consultas as $consulta) {
                    if (!in_array($consulta['conDiaAgendado'], $newDates)) {
                        $delStmt = $conn->prepare('DELETE FROM consulta WHERE conCodigo = ?');
                        $delStmt->execute([$consulta['conCodigo']]);
                    }
                }

                // 6. Inserir consultas faltantes
                foreach ($newDates as $date) {
                    // Verifica se já existe
                    $checkStmt = $conn->prepare('
                        SELECT COUNT(*) FROM consulta WHERE conDiaCodigo = ? AND conDiaAgendado = ?
                    ');
                    $checkStmt->execute([$sessionCode, $date]);
                    $exists = $checkStmt->fetchColumn();

                    if (!$exists) {
                        $addStmt = $conn->prepare('
                            INSERT INTO consulta (conDiaCodigo, conDiaAgendado) VALUES (?,?)
                        ');
                        $addStmt->execute([$sessionCode, $date]);
                    }
                }
            }
        }
        
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', $e]);
        exit();
    }
    
    echo json_encode(['status' => 'success', 'data' => $data]);
