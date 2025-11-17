<?php 
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    require_once 'connection.php';

    date_default_timezone_set(	'America/Sao_Paulo');

    $patientInfo = isset($_GET['patientCode']) ? $_GET['patientCode'] : 'unknown';

    // var_dump($patientInfo);
    if($patientInfo === 'unknown'){
        echo json_encode(['status' => 'error']);
        exit();
    }

    $filteredPatientInfo = [];

    //SELECT Paciente
    try{
        $getPacienteStmt = $conn->prepare("SELECT * FROM paciente WHERE pacCodigo = ?");
        $getPacienteStmt->execute([$patientInfo]);
        $gP = $getPacienteStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Paciente']);
        exit();
    }

    //SELECT Endereco
    try{
        $getEnderecoStmt = $conn->prepare("SELECT * FROM endereco WHERE endPacCodigo = ?");
        $getEnderecoStmt->execute([$patientInfo]);
        $gA = $getEnderecoStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Endereco']);
        exit();
    }

    //SELECT Sessao
    try{
        $getSessaoStmt = $conn->prepare("SELECT * FROM sessao WHERE sesPacCodigo = ?");
        $getSessaoStmt->execute([$patientInfo]);
        $gS = $getSessaoStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Sessao']);
        exit();
    }

    //code from session
    $sessionCode = $gS['sesCodigo'] ?? null;
    // if($sessionCode === null){
    //     echo json_encode(['status' => 'error', 'message' => 'Error, No Sessions Found']);
    //     exit();
    // }

    //SELECT DiaHoraAgendado
    try{
        $getDiaHoraAgendadoStmt = $conn->prepare("SELECT * FROM diahoraagendado WHERE diaSesCodigo = ?");
        $getDiaHoraAgendadoStmt->execute([$sessionCode]);
        $gD = $getDiaHoraAgendadoStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Patologia']);
        exit();
    }

    //SELECT Patologia
    try{
        $getPatologiaStmt = $conn->prepare("SELECT * FROM patologia WHERE patSesCodigo = ?");
        $getPatologiaStmt->execute([$sessionCode]);
        $gPat = $getPatologiaStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Patologia']);
        exit();
    }

    //SELECT ExameFisico
    try{
        $getExameFisicoStmt = $conn->prepare("SELECT * FROM examefisico WHERE exaSesCodigo = ?");
        $getExameFisicoStmt->execute([$sessionCode]);
        $gExa = $getExameFisicoStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Patologia']);
        exit();
    }

    //SELECT TratamentoFisioterapico
    try{
        $getTratamentoFisioterapicoStmt = $conn->prepare("SELECT * FROM tratamentofisioterapico WHERE traSesCodigo = ?");
        $getTratamentoFisioterapicoStmt->execute([$sessionCode]);
        $gTra = $getTratamentoFisioterapicoStmt->fetch(PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo json_encode(['status' => 'error', 'message' => 'Error in SELECT Patologia']);
        exit();
    }

    //format hour into HH:MM
    $timeFormatted = $gD['diaHorario'] ?? null;
    if ($timeFormatted) {
        $timeParts = explode(':', $timeFormatted);
        $timeFormatted = $timeParts[0] . ':' . $timeParts[1]; // HH:MM
    }

    $varBirthday = $gP['pacDtNascimento'] ?? null;

    //age calculator
    if(!isset($varBirthday)){ $varBirthday = date('Y-m-d'); }
    list($year, $month, $day) = explode('-', $varBirthday);
    $todayTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
    $birthdayTime = mktime( 0, 0, 0, $month, $day, $year);
    $age = floor((((($todayTime - $birthdayTime) / 60) / 60) / 24) / 365.25);
    
    //formated birthday
    $birthday = $day."/".$month."/".$year;

    //formated gender
    switch($gP['pacSexo'] ?? null){
        case 'm':
            $gender = "Masculino";
            break;
        case 'f':
            $gender = "Feminino";
            break;
        default:
            $gender = "-";
            break;
    }

    //formated smoker
    switch($gP['pacFumante'] ?? null){
        case 0:
            $smoker = "Não";
            break;
        case 1:
            $smoker = "Sim";
            break;
        default:
            $smoker = "-";
            break;
    }

    //array
    $dataObject = [ 
        //paciente 
        'patientCode'                  => $gP['pacCodigo'] ?? null,
        'patientCardNum'               => $gP['pacNumCarteirinha'] ?? null,
        'patientTypeAgreement'         => $gP['pacTipoConvenio'] ?? null,
        'patientDeactivated'           => $gP['pacDesativado'] ?? null,
        'patientDateDeactivated'       => $gP['pacDtDesativado'] ?? null,
        'patientName'                  => $gP['pacNome'] ?? null,
        'patientBirthDate'             => $birthday ?? null,
        'patientAge'                   => $age ?? null,
        'patientGender'                => $gender ?? null,
        'patientMaritalStatus'         => $gP['pacEstadoCivil'] ?? null,
        'patientWeight'                => $gP['pacPeso'] ?? null,
        'patientHeight'                => $gP['pacAltura'] ?? null,
        'patientSmoker'                => $smoker ?? null,
        'patientLevel'                 => $gP['pacNivelImportancia'] ?? null,
        'patientEmail'                 => $gP['pacEmail'] ?? null,
        'patientNumber'                => $gP['pacTelefone'] ?? null,
        'patientCPF'                   => $gP['pacCpf'] ?? null,
  
        //endereco  
        'addressCEP'                   => $gA['endCEP'] ?? null,
        'addressStreet'                => $gA['endRua'] ?? null,
        'addressNeighborhood'          => $gA['endBairro'] ?? null,
        'addressCity'                  => $gA['endCidade'] ?? null,
        'addressState'                 => $gA['endUF'] ?? null,
        'addressNumber'                => $gA['endNumero'] ?? null,
        'addressComplement'            => $gA['endComplemento'] ?? null,
  
        //sessao  
        'sessionSuperior'              => $gS['ParteSuperior'] ?? null,
        'sessionInferior'              => $gS['sesParteInferior'] ?? null,
        'sessionBack'                  => $gS['sesColuna'] ?? null,
        'sessionSuperiorDesc'          => $gS['sesGravidadePSuperior'] ?? null,
        'sessionInferiorDesc'          => $gS['sesGravidadePInferior'] ?? null,
        'sessionBackDesc'              => $gS['sesGravidadeColuna'] ?? null,
        'sessionDescription'           => $gS['sesDescricao'] ?? null,
        'sessionLastEdit'              => $gS['sesUltimaEdicao'] ?? null,
        'sessionAvaliationDate'        => $gS['sesDtAvaliacao'] ?? null,
          
        //diaHoraAgendado  
        'dayMonday'                    => $gD['diaSegunda'] ?? null,
        'dayTuesday'                   => $gD['diaTerca'] ?? null,
        'dayWednesday'                 => $gD['diaQuarta'] ?? null,
        'dayThrusday'                  => $gD['diaQuinta'] ?? null,
        'dayFriday'                    => $gD['diaSexta'] ?? null,
        'dayQuantitySession'           => $gD['diaQtdSessao'] ?? null,
        'dayTotalSession'              => $gD['diaTotalSessao'] ?? null,
        'dayTime'                      => $timeFormatted ?? null,
        'dayDateStartSession'          => $gD['diaDtInicioSessao'] ?? null,
        'dayDateFinishSession'         => $gD['diaDtFimSessao'] ?? null,
  
        //patologia  
        'patologyDiagnostic'           => $gPat['patDiagnosticoClinico'] ?? null,
        'patologyHMA'                  => $gPat['patHMA'] ?? null,
        'patologyPersonalBackground'   => $gPat['patAntecedentesPessoais'] ?? null,
        'patologyAssociatedPatology'   => $gPat['patPatologiaAssociada'] ?? null,
        'patologyTakeMeds'             => $gPat['patTomaMedicamento'] ?? null,
        'patologyWhenStarted'          => $gPat['patQuandoDorComecou'] ?? null,
        'patologyMoreIntensePosition ' => $gPat['patQualPosicaoDorMaisIntensa'] ?? null,
        'patologyWorkPosition'         => $gPat['patQualPosicaoTrabalho'] ?? null,
        'patologyHadSurgery'           => $gPat['patFezCirurgia'] ?? null,
        'patologyDateSurgery'          => $gPat['patDataCirurgia'] ?? null,
        'patologyComplementaryExams'   => $gPat['patExamesComplementares'] ?? null,
        'patologyAVS'                  => $gPat['patHaComprometimentoAVS'] ?? null,
        'patologyFunctionalLimitation' => $gPat['patLimitacaoFuncional'] ?? null,
        'patologyMarcha'               => $gPat['patComprometimentoMarcha'] ?? null,

        //exameFisico
        'examPA'                       => $gExa['exaPA'] ?? null,
        'examFR'                       => $gExa['exaFR'] ?? null,
        'examFC'                       => $gExa['exaFC'] ?? null,
        'examInspection'               => $gExa['exaInspecao'] ?? null,
        'examPalpation'                => $gExa['exaPalpacao'] ?? null,
        'examPainPalpation'            => $gExa['exaDorPalpacao'] ?? null,
        'examPainPalpationDesc'        => $gExa['exaDorPalpacaoDesc'] ?? null,
        'examEdema'                    => $gExa['exaEdema'] ?? null,
        'examEdemaDesc'                => $gExa['exaEdemaDesc'] ?? null,
        'examSpecificTests'            => $gExa['exaTestesEspecificos'] ?? null,
        'examADM'                      => $gExa['exaADM'] ?? null,
        'examADMDesc'                  => $gExa['exaADMDesc'] ?? null,
        'examFM'                       => $gExa['exaFM'] ?? null,
        'examFMDesc'                   => $gExa['exaFMDesc'] ?? null,
        'examMuscularTonus'            => $gExa['exaTonusMuscular'] ?? null,
        'examMuscularTonusDesc'        => $gExa['exaTonusMuscularDesc'] ?? null,
        'examMovement'                 => $gExa['exaMovimento'] ?? null,
        'examOrtese'                   => $gExa['exaFazUsoOrtese'] ?? null,
        'examOrteseDesc'               => $gExa['exaFazUsoOrteseDesc'] ?? null,
        'examPosturalDeviations'       => $gExa['exaDesviosPosturais'] ?? null,
        'examPosturalDeviationsDesc'   => $gExa['exaDesviosPosturaisDesc'] ?? null,

        //tratamentoFisioterapico
        'traTreatmentObjective'        => $gTra['traObjetivoTratamento'] ?? null,
        'traProposedTreatment'         => $gTra['traTratamentoProposto'] ?? null,

    ];
    $filteredPatientInfo[] = $dataObject;

    echo json_encode(['status' => 'success', 'data' => $filteredPatientInfo]);