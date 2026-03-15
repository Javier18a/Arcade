const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const usuario = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (!usuarioEncontrado) {
        alert("El usuario no existe");
        return;
    }

    if (usuarioEncontrado.password !== password) {
        alert("Contraseña incorrecta");
        return;
    }

    localStorage.setItem("usuarioActivo", usuario);

    window.location.href = "../Juegos/index.html";

});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim();
    if (!user) return;
    localStorage.setItem('arcadeUser', user);
    window.location.href = 'Juegos/index.html'; 
});