<?php
include "conexion.php";

$sql = "SELECT nickname, puntaje, mejor_combo, tiempo_vivo, fecha 
        FROM jugadores 
        ORDER BY puntaje DESC 
        LIMIT 6";

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

    <style>
        body {
            background: radial-gradient(circle, #1b1b3a, #050510);
            color: white;
            font-family: 'VT323', monospace;
            min-height: 100vh;
        }

        .ranking-card {
            background: rgba(0, 0, 0, 0.75);
            border: 2px solid white;
            box-shadow: 0 0 20px white;
        }

        h1 {
            font-size: 4rem;
        }

        table {
            font-size: 1.5rem;
        }

        .btn {
            font-size: 1.5rem;
        }
    </style>
</head>
<body>

    <div class="container py-5">
        <div class="ranking-card p-4">
            <h1 class="text-center mb-4">Ranking Galáctico</h1>

            <table class="table table-dark table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Puntaje</th>
                        <th>Mejor Combo</th>
                        <th>Tiempo Vivo</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $posicion = 1;

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $posicion . "</td>";
                            echo "<td>" . htmlspecialchars($row["nickname"]) . "</td>";
                            echo "<td>" . $row["puntaje"] . "</td>";
                            echo "<td>" . $row["mejor_combo"] . "</td>";
                            echo "<td>" . $row["tiempo_vivo"] . "s</td>";
                            echo "</tr>";

                            $posicion++;
                        }
                    } else {
                        echo "<tr><td colspan='5'>Todavía no hay jugadores</td></tr>";
                    }
                    ?>
                </tbody>
            </table>

            <div class="text-center mt-4">
                <a href="../index.php" class="btn btn-outline-light mx-2">Volver al inicio</a>
                <a href="../html/jugar.php" class="btn btn-outline-warning mx-2">Jugar otra vez</a>
            </div>
        </div>
    </div>

</body>
</html>

<?php
$conn->close();
?>