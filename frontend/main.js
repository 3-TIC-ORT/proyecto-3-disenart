const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const saveDesignButton = document.getElementById("saveDesignButton");
const loadDesignsButton = document.getElementById("loadDesignsButton"); 
const colorSelect = document.getElementById("colorSelect");
const talleSelect = document.getElementById("talleSelect");
const materialSelect = document.getElementById("materialSelect");
const nombreTrabajo = document.getElementById("nombreTrabajo");
const designList = document.getElementById("designList");
const clearDesignsButton = document.getElementById("clearDesignsButton");

let loggedInUser = null;

registerButton.addEventListener("click", () => {
    const username = registerUsernameInput.value;
    const password = registerPasswordInput.value;

    if (username && password) {
        postData('registro', { username, password }, (response) => {
            if (response.ok) {
                alert("Registro exitoso");
            } else {
                alert(response.message);
            }
        });
    } else {
        alert("Completa todo ");
    }
});

loginButton.addEventListener("click", () => {
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    if (username && password) {
        postData('login', { username, password }, (response) => {
            if (response.ok) {
                alert("exitos");
                loggedInUser = username;
            } else {
                alert(response.message);
            }
        });
    } else {
        alert("Completa todo");
    }
});

saveDesignButton.addEventListener("click", () => {
    const color = colorSelect.value;
    const talle = talleSelect.value;
    const material = materialSelect.value;
    const nombretp = nombreTrabajo.value;

    if (loggedInUser) {
        postData('guardarDiseno', { username: loggedInUser, color, talle, material, nombretp }, (response) => {
            if (response.ok) {
                alert("Diseño guardado");
            } else {
                alert("Error al guardar");
            }
        });
    } else {
        alert("Debes iniciar sesión.");
    }
});


loadDesignsButton.addEventListener("click", () => {
    postData('obtenerDisenos', {}, (response) => {
        if (response.ok && response.diseños) {
            designList.innerHTML = '';
            response.diseños.forEach(diseño => {
                const li = document.createElement("li");
                li.textContent = diseño.nombret;
                li.addEventListener("click", () => {
                    colorSelect.value = diseño.color;
                    talleSelect.value = diseño.talle;
                    materialSelect.value = diseño.material;
                    nombreTrabajo.value = "version de:";
                });
                li.addEventListener("dblclick", () => {
                    const confirmation = confirm("¿Deseas borrar este diseño?");
                    if (confirmation) {
                        console.log("Diseño borrado:", diseño);
                        li.remove();
                    }
                });


                designList.appendChild(li);
            });
        } else {
            console.error("Error al cargar", response.message);
        }
    });
});


clearDesignsButton.addEventListener("click", () => {
    const confirmation = confirm("¿Estás seguro de que deseas borrar todos los diseños?");
    if (confirmation) {
        postData('borrarDisenos', {}, (response) => {
            if (response.ok) {
                alert("Diseños borrados");
                cargarDisenos();
            } else {
                alert("No se pudo borrar los diseños");
            }
        });
    } else {
        alert("casi borras todo");
    }
});

const printDesignButton = document.getElementById("printDesignButton");

printDesignButton.addEventListener("click", () => {
    const color = colorSelect.value;
    const talle = talleSelect.value;
    const material = materialSelect.value;
    const nombretp = nombreTrabajo.value;

    if (loggedInUser) {
        postData('mandarAImprimir', { username: loggedInUser, color, talle, material, nombretp }, (response) => {
            if (response.ok) {
                alert("Diseño enviado a imprimir");
            } else {
                alert("Error al enviar diseño a imprimir");
            }
        });
    } else {
        alert("Debes iniciar sesión.");
    }
});


