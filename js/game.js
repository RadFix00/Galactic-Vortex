function PlaySound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.play();
    thissound.volume = 0.08; // Establece el volumen al 8%
}

function StopSound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
    thissound.volume = 0.08; // Establece el volumen al 8%
}

// Obtener la nave y el área de juego
const ship = document.getElementById("ship");
const gameArea = document.getElementById("gameArea");

// Posición inicial de la nave
let shipX = gameArea.offsetWidth / 2 - ship.offsetWidth / 2;
let shipY = gameArea.offsetHeight / 2 - ship.offsetHeight / 2;

// Actualiza la posición de la nave
function moveShip() {
    ship.style.left = shipX + "px";
    ship.style.top = shipY + "px";
}

// Mover la nave usando las teclas de flecha
document.addEventListener("keydown", (event) => {
    const step = 20; // Velocidad de movimiento

    if (event.key === "ArrowUp" && shipY > 0) {
        shipY -= step; // Mover hacia arriba
    } else if (event.key === "ArrowDown" && shipY < gameArea.offsetHeight - ship.offsetHeight) {
        shipY += step; // Mover hacia abajo
    } else if (event.key === "ArrowLeft" && shipX > 0) {
        shipX -= step; // Mover hacia la izquierda
    } else if (event.key === "ArrowRight" && shipX < gameArea.offsetWidth - ship.offsetWidth) {
        shipX += step; // Mover hacia la derecha
    }

    // Actualizar la posición de la nave
    moveShip();
});

// Llamar la función de movimiento inicial
moveShip();
