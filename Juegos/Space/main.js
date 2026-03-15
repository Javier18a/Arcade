const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "img/nave.png";

let player = {
    x: 330,
    y: 360,
    width: 60,
    height: 40
};

let balas = [];
let enemigos = [];
let enemyDirection = 1;

let puntaje = 0;
let kills = 0;
let vida = 3;

let gameOver = false;

// RECORDS

let recordScore = localStorage.getItem("spaceRecordScore") || 0;
let recordKills = localStorage.getItem("spaceRecordKills") || 0;

document.getElementById("recordScore").textContent = recordScore;
document.getElementById("recordKills").textContent = recordKills;


// CREAR ENEMIGOS

function crearEnemigos() {

    for (let y = 0; y < 3; y++) {

        for (let x = 0; x < 8; x++) {

            enemigos.push({

                x: 60 + x * 70,
                y: 40 + y * 50,
                width: 30,
                height: 20

            });
        }
    }
}

crearEnemigos();

// CONTROLES

document.addEventListener("keydown", e => {

    if (e.code === "ArrowLeft")
        player.x -= 20;

    if (e.code === "ArrowRight")
        player.x += 20;

    if (e.code === "Space") {

        balas.push({
            x: player.x + 18,
            y: player.y
        });

    }

});


// JUEGO

function actualizar() {

    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // JUGADOR

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // BALAS

    balas.forEach((b, i) => {

        b.y -= 6;

        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x, b.y, 4, 10);


        // COLISION ENEMIGO

        enemigos.forEach((e, j) => {

            if (
                b.x < e.x + e.width &&
                b.x + 4 > e.x &&
                b.y < e.y + e.height &&
                b.y + 10 > e.y
            ) {

                enemigos.splice(j, 1);
                balas.splice(i, 1);

                puntaje += 100;
                kills++;

            }

        });

    });


    // ENEMIGOS

    let bajar = false;

    enemigos.forEach(e => {

        e.x += enemyDirection;

        if (e.x < 10 || e.x > canvas.width - 40) {

            bajar = true;

        }

    });

    if (bajar) {

        enemyDirection *= -1;

        enemigos.forEach(e => {
            e.y += 20;
        });

    }


    // DIBUJAR ENEMIGOS

    ctx.fillStyle = "red";

    enemigos.forEach(e => {
        ctx.fillRect(e.x, e.y, e.width, e.height);
    });


    // ENEMIGOS LLEGAN ABAJO

    enemigos.forEach(e => {

        if (e.y + e.height > player.y) {

            vida--;

            enemigos = [];

            crearEnemigos();

        }

    });


    // TABLERO

    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("kills").textContent = kills;
    document.getElementById("vida").textContent = vida;


    // GAME OVER

    if (vida <= 0) {

        gameOver = true;

        if (puntaje > recordScore)
            localStorage.setItem("spaceRecordScore", puntaje);

        if (kills > recordKills)
            localStorage.setItem("spaceRecordKills", kills);

        alert("Game Over");

    }


    // GANAR

    if (enemigos.length === 0) {

        crearEnemigos();

    }


    requestAnimationFrame(actualizar);

}


// REINICIAR

function reiniciar() {

    location.reload();

}


actualizar();