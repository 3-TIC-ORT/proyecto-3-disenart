
const bti = document.getElementById("pasar");
const contenedor = document.getElementById("contenidoc");

bti.addEventListener("click", function() {
    contenedor.style.display = "block";
    bti.style.display = "none"
    document.body.style.background = "white";
});