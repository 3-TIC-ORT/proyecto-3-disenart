const bti = document.getElementById("pasar");
const contenedor = document.getElementById("contenidoc");
const bts = document.getElementById("loginButton");
const linki = document.getElementById("cuentae");
const usuarioElemento = document.getElementById('usuarioc');
const usernameInput = document.getElementById("registerUsername");
const passwordInput = document.getElementById("registerPassword");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const showPasswordButton = document.getElementById('showPassword');
const showLoginPasswordButton = document.getElementById('showLoginPassword');
const flechaa = document.getElementById("flechaa");
const menud = document.getElementById("menud");
const diseñosg = document.getElementById("diseñosg");
const fn = document.getElementById("fn");
const fm = document.getElementById("fm");
const loadDesignsButton = document.getElementById("loadDesignsButton");
const designList = document.getElementById("designList");
const instruciones = document.getElementById("instrucciones");


formregistro.style.display = "none";

bts.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username && password) {
        postData('registro', { username, password }, (response) => {
            if (response.ok) {
                alert("Registro exitoso"); 
                formregistro.style.display = "none";
                formsecion.style.display = "block";
                document.body.style.background = "none";

            } else {
                alert(response.message);
               
            }
        });
    } else {
        alert("Completa todo ");
    }
});


bti.addEventListener("click", () => {
    formregistro.style.display = "block";
    bti.style.display = "none";
    document.body.style.background = "none";
});

usuarioElemento.addEventListener("click", () => {
    formsecion.style.display = "block";
    contenedor.style.display = "none";
    document.body.style.background = "none";
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
                menu.style.display = "block";
                formsecion.style.display = "none";
                document.body.style.background = "none";
                
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
    document.body.style.background = "none";
});


showPasswordButton.addEventListener('mousedown', function() {
    passwordInput.type = 'text';
});

showPasswordButton.addEventListener('mouseup', function() {
    passwordInput.type = 'password';
});

showPasswordButton.addEventListener('mouseleave', function() {
    passwordInput.type = 'password';
});




showLoginPasswordButton.addEventListener('mousedown', function() {
    loginPasswordInput.type = 'text';
});

showLoginPasswordButton.addEventListener('mouseup', function() {
    loginPasswordInput.type = 'password';
});

showLoginPasswordButton.addEventListener('mouseleave', function() {
    loginPasswordInput.type = 'password';
});

flechaa.addEventListener("click", () => {
    formregistro.style.display = "block";
    formsecion.style.display =  "none";
    document.body.style.background = "none";
});


menud.addEventListener("click", () => {
    contenidoc.style.display = "block";
    menu.style.display =  "none";
    
});

diseñosg.addEventListener("click", () => {
    archivera.style.display = "block";
    menu.style.display =  "none";
    document.body.style.background = "none";
});

fm.addEventListener("click", () => {
    archivera.style.display = "none";
    menu.style.display =  "block";
    document.body.style.background = "none";
});

fn.addEventListener("click", () => {
    contenidoc.style.display = "none";
    menu.style.display =  "block";
    document.body.style.background = "none";
});

loadDesignsButton.addEventListener("click", () => {
    loadDesignsButton.style.display = "none";
    instrucciones.style.display =  "block";
    
});

designList.addEventListener("click", () => {
    archivera.style.display = "none";
    contenidoc.style.display =  "block";
});