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

function muteSound() {
    var thissound = document.getElementById('bgsnd');
    thissound.muted = !thissound.muted; // Alterna entre mutear y desmutear

    var icon = document.querySelector('img'); // Selecciona el icono de sonido
    if (thissound.muted) {
        icon.src = '/resourses/mute.png'; // Cambia el icono cuando está en mute
    } else {
        icon.src = '/resourses/sound.png'; // Cambia el icono cuando no está en mute
    }
}
