const bti = document.getElementById("pasar");
const btr = document.getElementById("registerButton");
const contenedor = document.getElementById("contenidoc");
const bts = document.getElementById("loginButton");
const linki = document.getElementById("cuentae");

const usernameInput = document.getElementById("registerUsername");
const passwordInput = document.getElementById("registerPassword");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");


bti.addEventListener("click", () => {
    formregistro.style.display = "block";
    bti.style.display = "none";
    document.body.style.background = "#87CEFA";
});

btr.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        formregistro.style.display = "none";
        formsecion.style.display = "block";
        document.body.style.background = "#87CEFA";
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

bts.addEventListener("click", confirmarUsuario);

function confirmarUsuario() {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (username && password) {
        postData('login', { username, password }, (response) => {
            console.log("Datos recibidos:", response);
            
            if (response.ok) {
                alert("Login exitoso");
                contenedor.style.display = "block";
                formsecion.style.display = "none";
                document.body.style.background = "#87CEF";
            } else {
                alert(response.message || "Usuario o contraseña incorrectos.");
            }
        });
    } else {
        alert("Completa todo");
    }
}




linki.addEventListener("click", () => {
    formsecion.style.display = "block";
    formregistro.style.display = "none";
});
