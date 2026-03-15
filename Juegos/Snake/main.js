const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;

let snake = [{ x: 200, y: 200 }];

let dx = grid;
let dy = 0;

let food = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
};

let puntaje = 0;
let movimientos = 0;
let gameOver = false;

// RECORDS

let recordPuntaje = localStorage.getItem("snakeRecordPuntaje") || 0;
let recordLongitud = localStorage.getItem("snakeRecordLongitud") || 0;
let recordMovimientos = localStorage.getItem("snakeRecordMovimientos") || 0;

document.getElementById("recordPuntaje").textContent = recordPuntaje;
document.getElementById("recordLongitud").textContent = recordLongitud;
document.getElementById("recordMovimientos").textContent = recordMovimientos;


// JUEGO

function actualizar() {

    if (gameOver) return;

    setTimeout(function () {

        ctx.clearRect(0, 0, 400, 400);
        let cabeza = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(cabeza);

        // COMER
        if (cabeza.x === food.x && cabeza.y === food.y) {

            puntaje += 10;
            food = {
                x: Math.floor(Math.random() * 20) * grid,
                y: Math.floor(Math.random() * 20) * grid
            };

        } else {
            snake.pop();
        }

        // COLISION PARED

        if (
            cabeza.x < 0 ||
            cabeza.x >= 400 ||
            cabeza.y < 0 ||
            cabeza.y >= 400
        ) {
            finJuego();
        }

        // COLISION CUERPO

        for (let i = 1; i < snake.length; i++) {
            if (cabeza.x === snake[i].x && cabeza.y === snake[i].y) {
                finJuego();
            }
        }

        // DIBUJAR SNAKE

        ctx.fillStyle = "lime";
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, grid, grid);
        });

        // DIBUJAR COMIDA
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, grid, grid);
        actualizarTablero();
        actualizar();

    }, 120);

}


// TABLERO TIEMPO REAL

function actualizarTablero() {
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("longitud").textContent = snake.length;
    document.getElementById("movimientos").textContent = movimientos;
}

// FIN DEL JUEGO

function finJuego() {

    gameOver = true;

    // RC Puntaje

    if (puntaje > recordPuntaje) {
        localStorage.setItem("snakeRecordPuntaje", puntaje);
    }

    // RC Longitud

    if (snake.length > recordLongitud) {
        localStorage.setItem("snakeRecordLongitud", snake.length);
    }

    // RC Movimientos

    if (movimientos > recordMovimientos) {
        localStorage.setItem("snakeRecordMovimientos", movimientos);
    }
    alert("Game Over");
}

// CONTROLES

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -grid;
        movimientos++;
    }

    if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = grid;
        movimientos++;
    }

    if (e.key === "ArrowLeft" && dx === 0) {
        dx = -grid;
        dy = 0;
        movimientos++;
    }

    if (e.key === "ArrowRight" && dx === 0) {
        dx = grid;
        dy = 0;
        movimientos++;
    }
});

// REINICIAR
function reiniciar() {
    location.reload();
}

// INICIAR JUEGO
actualizar();