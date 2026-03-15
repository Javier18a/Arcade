const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.usuario === usuario);

    if(existe){
        alert("El usuario ya existe");
        return;
    }

    usuarios.push({
        usuario: usuario,
        password: password
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    window.location.href = "login.html";

});