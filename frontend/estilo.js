
const bti = document.getElementById("pasar");
const btr = document.getElementById("registerButton")
const contenedor = document.getElementById("contenidoc");
const bts = document.getElementById("loginButton")

bti.addEventListener("click", function() {
    formregistro.style.display = "block";
    bti.style.display = "none"
    document.body.style.background = "white";
});

btr.addEventListener("click", function() {
    formregistro.style.display = "none";
    formsecion.style.display = "block";
    document.body.style.background = "white";
});

bts.addEventListener("click", function() {
    contenedor.style.display = "block";
    formsecion.style.display = "none";
    document.body.style.background = "white";
});

