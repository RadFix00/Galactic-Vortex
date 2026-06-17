<?php
session_start();
include "conexion.php";

header("Content-Type: application/json");

if (!isset($_SESSION["jugador_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No hay jugador en sesión"
    ]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$puntaje = isset($data["puntaje"]) ? intval($data["puntaje"]) : 0;
$mejorCombo = isset($data["mejor_combo"]) ? intval($data["mejor_combo"]) : 0;
$tiempoVivo = isset($data["tiempo_vivo"]) ? intval($data["tiempo_vivo"]) : 0;

$jugadorId = $_SESSION["jugador_id"];

$sql = "UPDATE jugadores 
        SET puntaje = ?, mejor_combo = ?, tiempo_vivo = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $puntaje, $mejorCombo, $tiempoVivo, $jugadorId);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Puntaje guardado"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al guardar puntaje"
    ]);
}

$stmt->close();
$conn->close();
?>