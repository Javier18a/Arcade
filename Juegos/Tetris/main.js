const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const filas = 20;
const columnas = 12;
const tam = 20;

let tablero = [];

// PIEZAS DE TETRIS

const piezas = [

    [[1, 1, 1, 1]], // I

    [
        [1, 1],
        [1, 1]
    ], // O

    [
        [0, 1, 0],
        [1, 1, 1]
    ], // T

    [
        [1, 0, 0],
        [1, 1, 1]
    ], // L

    [
        [0, 0, 1],
        [1, 1, 1]
    ], // J

    [
        [0, 1, 1],
        [1, 1, 0]
    ], // S

    [
        [1, 1, 0],
        [0, 1, 1]
    ] // Z

];

const colores = [
    "cyan",
    "yellow",
    "purple",
    "orange",
    "blue",
    "green",
    "red"
];

let pieza = nuevaPieza();

let puntaje = 0;
let lineas = 0;
let nivel = 1;

let gameOver = false;


// RECORDS

let recordPuntaje = localStorage.getItem("tetrisRecordPuntaje") || 0;
let recordLineas = localStorage.getItem("tetrisRecordLineas") || 0;
let recordNivel = localStorage.getItem("tetrisRecordNivel") || 0;

document.getElementById("recordPuntaje").textContent = recordPuntaje;
document.getElementById("recordLineas").textContent = recordLineas;
document.getElementById("recordNivel").textContent = recordNivel;


// CREAR TABLERO

for (let y = 0; y < filas; y++) {

    tablero[y] = [];
    
    for (let x = 0; x < columnas; x++) {
        tablero[y][x] = 0;
    }

}


// NUEVA PIEZA ALEATORIA

function nuevaPieza() {

    let index = Math.floor(Math.random() * piezas.length);

    return {

        x: 5,
        y: 0,
        forma: piezas[index],
        color: colores[index]

    };

}


// DIBUJAR

function dibujar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // TABLERO

    for (let y = 0; y < filas; y++) {

        for (let x = 0; x < columnas; x++) {

            if (tablero[y][x]) {

                ctx.fillStyle = tablero[y][x];

                ctx.fillRect(x * tam, y * tam, tam, tam);

            }

        }

    }

    // PIEZA

    ctx.fillStyle = pieza.color;

    pieza.forma.forEach((fila, y) => {

        fila.forEach((valor, x) => {

            if (valor) {

                ctx.fillRect((pieza.x + x) * tam, (pieza.y + y) * tam, tam, tam);

            }

        });

    });

}

function actualizar() {

    if (gameOver) return;

    pieza.y++;

    if (colision()) {
        pieza.y--;
        fusionar();
        limpiarLineas();
        pieza = nuevaPieza();
    }

    dibujar();
    actualizarTablero();
}

function colision() {

    for (let y = 0; y < pieza.forma.length; y++) {

        for (let x = 0; x < pieza.forma[y].length; x++) {

            if (

                pieza.forma[y][x] &&
                (tablero[y + pieza.y] &&
                    tablero[y + pieza.y][x + pieza.x]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

function fusionar() {
    pieza.forma.forEach((fila, y) => {
        fila.forEach((valor, x) => {
            if (valor) {
                tablero[y + pieza.y][x + pieza.x] = pieza.color;
            }
        });
    });
}

function limpiarLineas() {

    for (let y = filas - 1; y >= 0; y--) {

        if (tablero[y].every(v => v !== 0)) {

            tablero.splice(y, 1);

            tablero.unshift(new Array(columnas).fill(0));

            puntaje += 100;

            lineas++;

            if (lineas % 5 === 0) {

                nivel++;

            }

        }

    }

}


// TABLERO TIEMPO REAL

function actualizarTablero() {

    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("lineas").textContent = lineas;
    document.getElementById("nivel").textContent = nivel;

}

function finJuego() {

    gameOver = true;

    if (puntaje > recordPuntaje) {
        localStorage.setItem("tetrisRecordPuntaje", puntaje);
    }
    if (lineas > recordLineas) {
        localStorage.setItem("tetrisRecordLineas", lineas);
    }
    if (nivel > recordNivel) {
        localStorage.setItem("tetrisRecordNivel", nivel);
    }
    alert("Game Over");
}


// CONTROLES

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") pieza.x--;

    if (e.key === "ArrowRight") pieza.x++;

    if (e.key === "ArrowDown") pieza.y++;

});

function reiniciar() {
    location.reload();
}

setInterval(actualizar, 500);