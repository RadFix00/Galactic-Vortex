    <?php
    include "../php/conexion.php";

    $sql = "SELECT nickname, puntaje
            FROM jugadores 
            ORDER BY puntaje DESC 
            LIMIT 5";

    $result = $conn->query($sql);

    $mejoresJugadores = [];

    if ($result && $result->num_rows > 0) {
        while ($jugador = $result->fetch_assoc()) {
            $mejoresJugadores[] = $jugador;
        }
    }
    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Galactic Vortex</title>
        <link rel="stylesheet" href="../css/game.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
            crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">  

        <style>
        .tabla-puntos{
            max-width: 16%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tabla-puntos h1{
            font-size: 4em;
            color: yellow;
        }

        .tabla-puntos p{
            padding: 10px;
            font-size: 1.5em;
        }

        .tabla-puntos h2{
            color: red;
        }
        </style>
    </head>


    <body>
        <section>
            <nav class="navbar ">
                <a class="navbar-brand" href="../index.php">
                    <img onmouseover="PlaySound('mySound')" onmouseout="StopSound('mySound')" src="../resourses/back.png" width="70" height="70" alt="">
                </a>
                <div>
                    <h1 id="streakBoard"></h1>
                </div>
                <div>
                    <h1 id="bestStreakBoard"></h1>
                </div> 
                <form class="form-inline " >   
                    <h1 id="scoreBoard" class=" mr-5 my-4">Puntos: 0</h1>
                </form>
            </nav>
            <hr class="line">
            <div class="tabla-puntos">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <h1 class="p-1 d-inline-block">5 Mejores</h1>
                        <?php if (!empty($mejoresJugadores)): ?>

                            <?php foreach ($mejoresJugadores as $posicion => $jugador): ?>

                                <p class="puntaje">
                                <?php echo $posicion + 1; ?>.

                                <?php echo htmlspecialchars(
                                    $jugador["nickname"],
                                    ENT_QUOTES,
                                    "UTF-8"
                                ); ?>

                                

                                <?php echo (int) $jugador["puntaje"]; ?> puntos
                                </p>

                            <?php endforeach; ?>
                            
                        <?php else: ?>
                            <h1 id="puntaje">Todavía no hay puntajes</h1>
                        <?php endif; ?>
                        <h2 id="highScoreBoard" class="p-1 mx-4">Tu Puntaje: 0</h1>
                    
                    </li>
                </ul>
            </div>
            <div id="gameArea">
                <div id="ship"></div>
                <div id="bullet"></div>
                <div id="enemy"></div>
                <div id="healthBarContainer">
                    <div id="healthBar"></div>
                </div>
                <div id="turboContainer">
                    <div id="turboBar"></div>
                </div>
            </div>

        </section>
        <audio id="turbosound" src="https://cdn.freesound.org/previews/784/784909_5287430-lq.mp3"></audio>
        <audio id="bulletsound" src="https://cdn.freesound.org/previews/421/421704_2927958-lq.ogg"></audio>
        <audio id='mySound' src='https://cdn.freesound.org/previews/658/658261_13579627-lq.mp3'></audio>
        <script src="../js/game.js"></script>
    </body>
    </html>