const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const dinoImg = new Image();
dinoImg.src = "img/dino.webp";

const cactusImg = new Image();
cactusImg.src = "img/cactus.webp";

let dino = {
    x: 30,
    y: 120, // Más abajo en el canvas
    width: 40,
    height: 40,
    vy: 0,
    jumping: false
};

let cactus = {
    x: 600,
    y: 160, // Más abajo en el canvas
    width: 20,
    height: 50
};



let gravedad = 1.2;
let velocidad = 6;

let distancia = 0;
let saltos = 0;
let puntaje = 0;

let gameOver = false;

// RECORDS DESDE LOCAL STORAGE

let recordDistancia = localStorage.getItem("recordDistancia") || 0;
let recordSaltos = localStorage.getItem("recordSaltos") || 0;
let recordPuntaje = localStorage.getItem("recordPuntaje") || 0;

document.getElementById("recordDistancia").textContent = recordDistancia;
document.getElementById("recordSaltos").textContent = recordSaltos;
document.getElementById("recordPuntaje").textContent = recordPuntaje;


// ACTUALIZAR JUEGO

function actualizar() {

    if (gameOver) return;
    ctx.clearRect(0, 0, 600, 200);

    // GRAVEDAD

    dino.vy += gravedad;
    dino.y += dino.vy;

    let suelo = canvas.height - dino.height;

if (dino.y > suelo) {
    dino.y = suelo;
    dino.jumping = false;
}

    // MOVER CACTUS

    cactus.x -= velocidad;

    if (cactus.x < -20) {
        cactus.x = 600;
        puntaje += 10;
    }

    // COLISION

    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        finJuego();
    }

    // DIBUJAR DINO

    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    // DIBUJAR CACTUS

    ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);
    // DISTANCIA

    distancia++;

    // ACTUALIZAR TABLERO

    actualizarTablero();
    requestAnimationFrame(actualizar);

}


// TABLERO EN TIEMPO REAL

function actualizarTablero() {
    document.getElementById("distancia").textContent = distancia;
    document.getElementById("saltos").textContent = saltos;
    document.getElementById("puntaje").textContent = puntaje;
}


// SALTO

function saltar() {

    if (!dino.jumping) {
        dino.vy = -15;
        dino.jumping = true;
        saltos++;
    }
}


// FIN DEL JUEGO

function finJuego() {

    gameOver = true;

    // GUARDAR RECORD DISTANCIA

    if (distancia > recordDistancia) {
        localStorage.setItem("recordDistancia", distancia);
    }


    // GUARDAR RECORD SALTOS
    if (saltos > recordSaltos) {
        localStorage.setItem("recordSaltos", saltos);
    }


    // GUARDAR RECORD PUNTAJE

    if (puntaje > recordPuntaje) {
        localStorage.setItem("recordPuntaje", puntaje);
    }
    alert("Game Over");

}


// REINICIAR

function reiniciar() {
    location.reload();
}


// CONTROL DE TECLAS

document.addEventListener("keydown", function (e) {

    if (e.code === "Space") {
        saltar();
    }
});

// INICIAR JUEGO

actualizar();