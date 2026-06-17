<?php
session_start();
include "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = trim($_POST["nickname"]);

    if ($nickname == "") {
        die("El nickname no puede estar vacío");
    }

    $sql = "INSERT INTO jugadores (nickname) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nickname);

    if ($stmt->execute()) {
        $_SESSION["jugador_id"] = $stmt->insert_id;
        $_SESSION["nickname"] = $nickname;

        header("Location: ../html/jugar.php");
        exit();
    } else {
        echo "Error al guardar jugador: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>