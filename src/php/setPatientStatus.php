<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'connection.php';

$patientCode = isset($_GET['patientCode']) ? $_GET['patientCode'] : 'unknown';
$patientStatus = isset($_GET['patientStatus']) ? $_GET['patientStatus'] : 'unknown';

if($patientCode === 'unknown' || $patientStatus === 'unknown'){
    echo json_encode(['status' => 'error', 'message' => 'patientData or patientStatus without any data', $patientCode, $patientStatus]);
    exit();
}

//Change Status to bool so DB accept it
switch($patientStatus){
    case "confirmed":
        $status = true;
        break;
    case "destructive":
        $status = false;
        break;
    case "pending":
        $status = null;
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Error in: Switch, went into Default']);
        exit();
}
    
try{
    $setPatientStatusStmt = $conn->prepare("UPDATE consulta SET conStatusDiaAgendado = ? WHERE conCodigo = ?");
    $setPatientStatusStmt->execute([$status, $patientCode]);
    $setPatientStatus = $setPatientStatusStmt->fetch(PDO::FETCH_ASSOC);
}
catch(PDOException $e){
    echo json_encode(['status' => 'error', 'message' => 'Error in: getPatientData']);
    exit();
}

echo json_encode(['status' => 'success']);
