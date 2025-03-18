// Sonidos
function PlaySound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.play();
    thissound.volume = 0.08;
}

function StopSound(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}

// Elementos del juego
const ship = document.getElementById("ship");
const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");
const highScoreBoard = document.getElementById("highScoreBoard");
const healthBar = document.getElementById("healthBar");
const turboBar = document.getElementById("turboBar");

let shipX = gameArea.offsetWidth / 2 - ship.offsetWidth / 2;
let shipY = gameArea.offsetHeight - 60;
const baseSpeed = 6;
const turboSpeed = 12;
let tiempoVivo = 0;

const bulletSpeed = 8;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let health = 100;
let turbo = 100;
let isTurboActive = false;

highScoreBoard.textContent = `High Score: ${highScore}`;

let currentStreak = 0;
let bestStreak = localStorage.getItem("bestStreak") || 0;
const streakBoard = document.getElementById("streakBoard");
const bestStreakBoard = document.getElementById("bestStreakBoard");

streakBoard.textContent = `Streak: ${currentStreak}`;
bestStreakBoard.textContent = `Best Streak: ${bestStreak}`;

const keysPressed = {};

setInterval(() => {
    tiempoVivo++; // Incrementa cada segundo
}, 1000);


// Detectar teclas presionadas
document.addEventListener("keydown", (event) => {
    if (event.key === "Shift" && turbo > 20) {
        isTurboActive = true;
    } else {
        keysPressed[event.key] = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        isTurboActive = false;
    }
    delete keysPressed[event.key];
});

// Movimiento de la nave
function moveShip() {
    let step = isTurboActive ? turboSpeed : baseSpeed;
    let moving = false;

    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
        shipY = Math.max(0, shipY - step);
        moving = true;
    }
    if (keysPressed["ArrowDown"] || keysPressed["s"]) {
        shipY = Math.min(gameArea.offsetHeight - ship.offsetHeight, shipY + step);
        moving = true;
    }
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
        shipX = Math.max(0, shipX - step);
        moving = true;
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
        shipX = Math.min(gameArea.offsetWidth - ship.offsetWidth, shipX + step);
        moving = true;
    }

    if (moving) {
        ship.style.transform = `translate(${shipX}px, ${shipY}px)`;
    }

    requestAnimationFrame(moveShip);
}

// Disparar balas
document.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Spacebar") shootBullet();
});
document.addEventListener("click", shootBullet);

function shootBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.position = "absolute";

    const shipRect = ship.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();

    bullet.style.left = `${shipRect.left + shipRect.width / 120 - gameRect.left - bullet.offsetWidth / 2}px`;
    bullet.style.top = `${shipRect.bottom - gameRect.top}px`;

    gameArea.appendChild(bullet);

    const bulletSound = new Audio(document.getElementById('bulletsound').src);
    bulletSound.volume = 0.08;
    bulletSound.play();

    const bulletInterval = setInterval(() => {
        let bulletTop = parseInt(bullet.style.top) || 0;
        bulletTop -= bulletSpeed;
        bullet.style.top = `${bulletTop}px`;

        checkBulletCollision(bullet, bulletInterval);
        if (bulletTop <= 0) {
            clearInterval(bulletInterval);
            bullet.remove();
        }
    }, 16);
}

// Enemigos
let enemySpeed = 2;
let enemySpawnInterval = 2000;
let difficultyLevel = 1;

function spawnEnemy() {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.position = "absolute";
    enemy.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;
    enemy.style.top = `0px`;

    gameArea.appendChild(enemy);

    const enemyInterval = setInterval(() => {
        let enemyTop = parseInt(enemy.style.top) || 0;
        enemyTop += enemySpeed;
        enemy.style.top = `${enemyTop}px`;

        if (enemyTop >= gameArea.clientHeight) {
            clearInterval(enemyInterval);
            enemy.remove();
            reduceHealth(20);
        }
    }, 16);

    enemy.dataset.intervalId = enemyInterval;
}

function updateDifficulty() {
    if (score >= difficultyLevel * 80) {
        difficultyLevel++;
        enemySpeed += 0.5;
        enemySpawnInterval = Math.max(500, enemySpawnInterval - 200);
        clearInterval(enemySpawnTimer);
        enemySpawnTimer = setInterval(spawnEnemy, enemySpawnInterval);
    }
}

let enemySpawnTimer = setInterval(spawnEnemy, enemySpawnInterval);

// Detectar colisiones de balas con enemigos
function checkBulletCollision(bullet, bulletInterval) {
    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach(enemy => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
        ) {
            clearInterval(bulletInterval);
            bullet.remove();

            clearInterval(enemy.dataset.intervalId);
            enemy.remove();
            updateScore();
        }
    });
}

// Puntaje
function updateScore() {
    score += 10;
    currentStreak += 1;
    scoreBoard.textContent = `Score: ${score}`;
    streakBoard.textContent = `Streak: ${currentStreak}`;

    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        localStorage.setItem("bestStreak", bestStreak);
        bestStreakBoard.textContent = `Best Streak: ${bestStreak}`;
    }

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreBoard.textContent = `High Score: ${highScore}`;
    }

    updateDifficulty();
}

function resetStreak() {
    currentStreak = 0;
    streakBoard.textContent = `Streak: ${currentStreak}`;
}

// Barra de vida
function reduceHealth(amount) {
    health -= amount;
    if (health < 0) health = 0;
    healthBar.style.width = `${health}%`;

    if (health === 0) {
        resetStreak();
        gameOver();
    }
}

// Fin del juego
function gameOver() {
    location.reload();
}

let turboSoundPlaying = false;

function updateTurbo() {
    if (isTurboActive && turbo > 0) {
        if (!turboSoundPlaying) {
            const turboSound = new Audio(document.getElementById('turbosound').src);
            turboSound.volume = 0.08;
            turboSound.play();
            turboSoundPlaying = true;
            turboSound.onended = () => {
                turboSoundPlaying = false;
            };

            setTimeout(() => {
                turbo -= 3;
                turboSoundPlaying = false;
            }, 3000);
        } else {
            turbo -= 3;
        }
    } else if (!isTurboActive && turbo < 100) {
        turbo += 0.2;
        turboSoundPlaying = false;
    }

    if (turbo < 20) {
        isTurboActive = false;
    }

    turboBar.style.width = `${turbo}%`;

    requestAnimationFrame(updateTurbo);
}

// Power-up de salud
function spawnHealthPowerUp() {
    const powerUp = document.createElement("div");
    powerUp.classList.add("health-powerup");
    powerUp.style.position = "absolute";
    powerUp.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;
    powerUp.style.top = `0px`;

    gameArea.appendChild(powerUp);

    const powerUpSpeed = 2;
    const powerUpInterval = setInterval(() => {
        let powerUpTop = parseInt(powerUp.style.top) || 0;
        powerUpTop += powerUpSpeed;
        powerUp.style.top = `${powerUpTop}px`;

        if (powerUpTop >= gameArea.clientHeight) {
            clearInterval(powerUpInterval);
            powerUp.remove();
        }

        checkPowerUpCollision(powerUp, powerUpInterval);
    }, 16);
}

function checkPowerUpCollision(powerUp, powerUpInterval) {
    const powerUpRect = powerUp.getBoundingClientRect();
    const shipRect = ship.getBoundingClientRect();

    if (
        powerUpRect.left < shipRect.right &&
        powerUpRect.right > shipRect.left &&
        powerUpRect.top < shipRect.bottom &&
        powerUpRect.bottom > shipRect.top
    ) {
        clearInterval(powerUpInterval);
        powerUp.remove();
        increaseHealth(20);
    }
}

function increaseHealth(amount) {
    health += amount;
    if (health > 100) health = 100;
    healthBar.style.width = `${health}%`;
}

setInterval(spawnHealthPowerUp, 10000); // Aparece cada 10 segundos

// Iniciar juego
updateTurbo();
moveShip();

