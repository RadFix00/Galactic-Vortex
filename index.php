<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galactic Vortex</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"  integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    
</head>
<body>
    <audio id="bgsnd" loop preload="auto">
        <source src="https://cdn.freesound.org/previews/561/561798_10859468-lq.mp3" type="audio/mpeg">
    </audio>
  
    <section class="d-flex justify-content-center align-items-start vh-100">
        <nav class="navbar position-absolute">
            <a class="navbar-brand" >
                <img onclick="muteSound()" src="resourses/sound.png" width="50" height="50" alt="">
            </a>
        </nav>
        
        <div class="container">
            <div class="mb-4">
                <img src="resourses/letter.png" alt="" class="img-fluid">
            </div>
            <div>
                 <form action="php/guardarjugador.php" method="POST">
                    <input 
                        class="btn-lg shadow-lg my-1" 
                        type="text" 
                        name="nickname" 
                        placeholder="NickName"
                        required
                    >
                    <button 
                        onmouseover="PlaySound('mySound')" 
                        onmouseout="StopSound('mySound')" 
                        class="d-block btn btn-lg btn-outline-light shadow-lg my-4" 
                        type="submit">
                        Jugar
                    </button>
                </form>
            </div>
            <a onmouseover="PlaySound('mySound')" onmouseout="StopSound('mySound')" class="d-block btn btn-lg btn-outline-light shadow-lg my-4" href="">Salir</a>
            <a onmouseover="PlaySound('mySound')" onmouseout="StopSound('mySound')" href="html/terminoscondiciones.html" class="terminos">¿Como Jugar?</a>
        </div>
    </section>
    
    <audio id="mySound" src="https://cdn.freesound.org/previews/658/658261_13579627-lq.mp3" preload="auto"></audio>
        <script src="js/script.js"></script>
        <script src="js/game.js"></script>
        
</body>

</html>