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
const selectColor = document.getElementById('colorSelect');
const imagenColor = document.getElementById('buzoImage');
const uploadImageInput = document.getElementById('uploadImage');
const addNameButton = document.getElementById("addNameButton");
const nombrePersonaInput = document.getElementById("nombrePersona");
const nameOverlay = document.getElementById("nameOverlay");
const positionSelect = document.getElementById("positionSelect");

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
                alert("Login exitoso");
                loggedInUser = username;
            } else {
                alert(response.message);
            }
        });
    } else {
        alert("Completa todo");
    }
});

const colorToImageMap = {
    negro: "../imagenes/buzonegro.png",
    violeta: "../imagenes/buzovioleta.png",
    azul: "../imagenes/buzoazul.png",
    blanco: "../imagenes/buzoblanco.png",
    rojo: "../imagenes/buzorojo.png"
};

saveDesignButton.addEventListener("click", () => {
    const color = colorSelect.value;
    const talle = talleSelect.value;
    const material = materialSelect.value;
    const nombretp = nombreTrabajo.value;
    const imageUrl = colorToImageMap[color] || "";  
    const nombrePersona = nombrePersonaInput.value;  
    const positionOption = positionSelect.value;  

    if (loggedInUser) {
        
        postData('guardarDiseno', { 
            username: loggedInUser, 
            color, 
            talle, 
            material, 
            nombretp, 
            imageUrl, 
            nombrePersona, 
            positionOption   
        }, (response) => {
            if (response.ok) {
                alert("Diseño guardado con éxito");
            } else {
                alert("Error al guardar el diseño");
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
                    nombreTrabajo.value = "Versión de: ";

                    const imageUrl = colorToImageMap[diseño.color];
                    if (imageUrl) {
                        imagenColor.src = imageUrl;
                        imagenColor.style.display = "block";  
                    } else {
                        imagenColor.src = "";
                        imagenColor.style.display = "none";  
                    }
                });

                li.addEventListener("dblclick", () => {
                    const confirmation = confirm("¿Deseas borrar este diseño?");
                    if (confirmation) {
                        postData('borrarDiseno', { username: loggedInUser, nombretp: diseño.nombret }, (response) => {
                            if (response.ok) {
                                alert("Diseño borrado");
                                li.remove();
                            } else {
                                alert("Error al borrar el diseño");
                            }
                        });
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
                loadDesignsButton.click();  
            } else {
                alert("No se pudo borrar los diseños");
            }
        });
    }
});

const printDesignButton = document.getElementById("printDesignButton");

printDesignButton.addEventListener("click", () => {
    const color = colorSelect.value;
    const talle = talleSelect.value;
    const material = materialSelect.value;
    const nombretp = nombreTrabajo.value;
    const imageUrl = colorToImageMap[color] || "";  

    if (loggedInUser) {
        postData('mandarAImprimir', { username: loggedInUser, color, talle, material, nombretp, imageUrl }, (response) => {
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

selectColor.addEventListener('change', function() {
    const selectedColor = selectColor.value;

    if (colorToImageMap[selectedColor]) {
        imagenColor.src = colorToImageMap[selectedColor];
        imagenColor.style.display = "block";
    } else {
        imagenColor.src = "";
        imagenColor.style.display = "none"; 
    }
});


uploadImageInput.addEventListener('change', function() {
    const file = uploadImageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function() {
            const base64Image = reader.result;
            const fileName = file.name; 

            if (loggedInUser) {
                postData('uploadImage', { username: loggedInUser, image: base64Image, fileName: fileName }, (response) => {
                    if (response.ok) {
                        alert("Imagen subida exitosamente");
                    } else {
                        alert("Error al subir la imagen");
                    }
                });
            } else {
                alert("Debes iniciar sesión para subir imágenes.");
            }
        };

        reader.readAsDataURL(file); 
    }
});


addNameButton.addEventListener("click", () => {
    const nombrePersona = nombrePersonaInput.value;

    if (nombrePersona && buzoImage.style.display === "block") {
        nameOverlay.textContent = nombrePersona;
        nameOverlay.style.display = "block"; 
    } else {
        alert("Por favor, ingresa un nombre y selecciona un color para el buzo.");
    }
});

let nameTopPosition = 350;

positionSelect.addEventListener("change", () => {
    const selectedOption = positionSelect.value;

    if (selectedOption === "subir") {
        nameTopPosition -= 100; 
    } else if (selectedOption === "bajar") {
        nameTopPosition += 100; 
    }

    
    nameOverlay.style.top = `${nameTopPosition}px`;
});