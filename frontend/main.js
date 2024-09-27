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
const colorLetraSelect = document.getElementById("colorLetraSelect");
const uploadImageButton = document.getElementById("uploadImagebutton");
const formatoSelect = document.getElementById("formatoSelect");
const agregarFormatoButton = document.getElementById("agregarFormatoButton");
const colorLineaSelect = document.getElementById("colorLineaSelect");
const aplicarColorButton = document.getElementById("aplicarColorButton");
const posicionTexto = document.getElementById("posicionTextoSelect");
const addTexto = document.getElementById("addTextoButton");
const textoPersonalizado = document.getElementById("textoPersonalizadoInput");
const textoe = document.getElementById("textoe");
const subtextoPersonalizado = document.getElementById("subtextoPersonalizadoInput");
const botonsubtexto = document.getElementById("addsubTextoButton");
const posicionsubTexto = document.getElementById ("posicionsubTextoSelect");
const subtexto = document.getElementById("subtexto");



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
    azul: "../imagenes/buzoazul.png",
    blanco: "../imagenes/buzoblanco.png",
    rojo: "../imagenes/buzorojo.png",
    verde: "../imagenes/buzoverde.png",
    naranja: "../imagenes/buzonaranja.png",
    celeste: "../imagenes/buzoceleste.png"
};

saveDesignButton.addEventListener("click", () => {
    const color = colorSelect.value;
    const talle = talleSelect.value;
    const material = materialSelect.value;
    const nombretp = nombreTrabajo.value;
    const imageUrl = colorToImageMap[color] || "";  
    const nombrePersona = nombrePersonaInput.value;  
    const positionOption = positionSelect.value;
    const selectedColor = colorLetraSelect.value; 
    const colorLinea = colorLineaSelect.value;
    const formato = formatoSelect.value
    const posicionTexto = posicionTextoSelect.value
    const textoPersonalizado = textoPersonalizadoInput.value
    const subtextoPersonalizado = subtextoPersonalizadoInput.value
    const posicionsubTexto = posicionsubTextoSelect.value

    if (loggedInUser) {
        
        postData('guardarDiseno', { 
            username: loggedInUser, 
            color, 
            talle, 
            material, 
            nombretp, 
            imageUrl, 
            nombrePersona, 
            positionOption,
            selectedColor,
            colorLinea,
            formato,
            posicionTexto,
            textoPersonalizado,
            posicionsubTexto,
            subtextoPersonalizado

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
                    materialSelect.value = diseño.material;
                    nombreTrabajo.value = "Versión de: ";
                    nombrePersonaInput.value = "pone tu nombre "
                    positionSelect.value = diseño.lugarn;
                    colorLetraSelect.value = diseño.colorn;
                    colorLineaSelect.value = diseño.colorl;
                    formatoSelect.value = diseño.formato
                    posicionTextoSelect.value = diseño.posicionT
                    textoPersonalizadoInput.value = diseño.texto
                    talleSelect.value = diseño.talle
                    posicionsubTextoSelect.value = diseño.subtextop
                    subtextoPersonalizadoInput.value = diseño.subtextoi

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

uploadImageButton.addEventListener("click", () => {
    const file = uploadImageInput.files[0]; 

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function() {
            const base64Image = reader.result;  
            const fileName = file.name;  

            if (loggedInUser) {
                postData('uploadImage', { 
                    username: loggedInUser, 
                    image: base64Image, 
                    fileName: fileName 
                }, (response) => {
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
    } else {
        alert("Selecciona un archivo de imagen.");
    }
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
    const nombrePersona = nombrePersonaInput.value;  
    const positionOption = positionSelect.value; 
    const selectedColor = colorLetraSelect.value;
    const formato = formatoSelect.value
    const colorLinea = colorLineaSelect.value;
    const posicionTexto = posicionTextoSelect.value
    const textoPersonalizado = textoPersonalizadoInput.value


    if (loggedInUser) {
        postData('mandarAImprimir', { username: loggedInUser, color, talle, material, nombretp, imageUrl, nombrePersona, positionOption, selectedColor, formato, colorLinea, posicionTexto, textoPersonalizado }, (response) => {
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



addNameButton.addEventListener("click", () => {
    const nombrePersona = nombrePersonaInput.value;
    const selectedColor = colorLetraSelect.value; 

    if (nombrePersona && buzoImage.style.display === "block") {
        nameOverlay.textContent = nombrePersona;
        nameOverlay.style.display = "block";
        nameOverlay.style.color = selectedColor; 
    } else {
        alert("Por favor, ingresa un nombre y selecciona un color para el buzo.");
    }
});


let nameTopPosition = 330;

positionSelect.addEventListener("change", () => {
    const selectedOption = positionSelect.value;

    if (selectedOption === "arriba") {
        nameTopPosition = 330; 
    } else if (selectedOption === "abajo") {
        nameTopPosition = 450; 
    }

    
    nameOverlay.style.top = `${nameTopPosition}px`;
});

colorLetraSelect.addEventListener("change", () => {
    const selectedColor = colorLetraSelect.value; 
    nameOverlay.style.color = selectedColor; 
});

let textoTopPosition = 350;
let textoLeftPosition = 140;  

posicionTexto.addEventListener("change", () => {
    const selectedOption2 = posicionTexto.value;

    if (selectedOption2 === "arriba-atras") {
        textoTopPosition = 350; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "abajo-atras") {
        textoTopPosition = 480; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "medio-atras") {
        textoTopPosition = 400; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "arriba-adelante") {
        textoTopPosition = 330; 
        textoLeftPosition = 140;  
    } else if (selectedOption2 === "medio-adelante") {
        textoTopPosition = 380; 
        textoLeftPosition = 140;  
    } else if (selectedOption2 === "abajo-adelante") {
        textoTopPosition = 450; 
        textoLeftPosition = 140;  
    }
    
    textoe.style.top = `${textoTopPosition}px`;
    textoe.style.left = `${textoLeftPosition}px`;  
});

addTexto.addEventListener("click", () => {
    const texto = textoPersonalizado.value;
    if (texto.trim() !== "") {
        textoe.textContent = texto;  
    }
});

let subtextoTopPosition = 340;
let subtextoLeftPosition = 140;  


posicionsubTexto.addEventListener("change", () => {
    const selectedOption3 = posicionsubTexto.value;

    if (selectedOption3 === "arriba-atras") {
        subtextoTopPosition = 360; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "abajo-atras") {
        subtextoTopPosition = 490; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "medio-atras") {
        subtextoTopPosition = 410; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "arriba-adelante") {
        subtextoTopPosition = 340; 
        subtextoLeftPosition = 140;  
    } else if (selectedOption3 === "medio-adelante") {
        subtextoTopPosition = 390; 
        subtextoLeftPosition = 140;  
    } else if (selectedOption3 === "abajo-adelante") {
        subtextoTopPosition = 460; 
        subtextoLeftPosition = 140;  
    }
    
    subtexto.style.top = `${subtextoTopPosition}px`;
    subtexto.style.left = `${subtextoLeftPosition}px`;  
});

botonsubtexto.addEventListener("click", () => {
    const texto2 = subtextoPersonalizado.value;
    if (texto2.trim() !== "") {
        subtexto.textContent = texto2;  
    }
});

colorLetraSelect.addEventListener("change", () => {
    const selectedColor = colorLetraSelect.value; 
    textoe.style.color = selectedColor;  
});

let recBlanco1, recBlanco2;


const colorMap = {
    blancol: "../formato/recblanco.png",
    negrol: "../formato/recnegro.png",
    azull: "../formato/recceleste.png",
    violetal: "../formato/recvioleta.png",
    rojol: "../formato/recrojo.png",
    grisl: "../formato/recgris.png"
};

agregarFormatoButton.addEventListener("click", () => {
    const selectedFormato = formatoSelect.value;

    
    if (recBlanco1) recBlanco1.remove();
    if (recBlanco2) recBlanco2.remove();

    
    if (selectedFormato === "medio") {
        const selectedColor = colorLineaSelect.value; 
        const newSrc = colorMap[selectedColor]; 

        if (newSrc) {
            
            recBlanco1 = document.createElement("img");
            recBlanco1.src = newSrc;
            recBlanco1.style.position = "absolute";
            recBlanco1.style.top = "380px";
            recBlanco1.style.left = "75px";
            recBlanco1.style.width = "130px";
            recBlanco1.id = "recBlanco1";

            
            recBlanco2 = document.createElement("img");
            recBlanco2.src = newSrc;
            recBlanco2.style.position = "absolute";
            recBlanco2.style.top = "380px";
            recBlanco2.style.left = "316px";
            recBlanco2.style.width = "130px";
            recBlanco2.id = "recBlanco2";

            document.body.appendChild(recBlanco1);
            document.body.appendChild(recBlanco2);
        } else {
            console.log("Color no encontrado en colorMap.");
        }
    } else if (selectedFormato === "liso") {
        console.log("borramos");
    } else if (selectedFormato=== "diagonal"){

        const selectedColor = colorLineaSelect.value; 
        const newSrc = colorMap[selectedColor]; 

        if (newSrc) {
            
            recBlanco1 = document.createElement("img");
            recBlanco1.src = newSrc;
            recBlanco1.style.position = "absolute";
            recBlanco1.style.top = "380px";
            recBlanco1.style.left = "40px";
            recBlanco1.style.width = "250px";
            recBlanco1.style.height = "20px"
            recBlanco1.style.transform = "rotate(-60deg)";
            recBlanco1.id = "recBlanco1";

            
            recBlanco2 = document.createElement("img");
            recBlanco2.src = newSrc;
            recBlanco2.style.position = "absolute";
            recBlanco2.style.top = "380px";
            recBlanco2.style.left = "300px";
            recBlanco2.style.width = "250px";
            recBlanco2.style.height = "20px"
            recBlanco2.style.transform = "rotate(-60deg)";
            recBlanco2.id = "recBlanco2";

            document.body.appendChild(recBlanco1);
            document.body.appendChild(recBlanco2);
    }
}});


aplicarColorButton.addEventListener("click", () => {
    const selectedColor = colorLineaSelect.value;
    
    
    const newSrc = colorMap[selectedColor]; 

    if (newSrc) {
        
        if (recBlanco1 && recBlanco2) {
            recBlanco1.src = newSrc;
            recBlanco2.src = newSrc;
        } else {
            alert("primero pone formato");
        }
    } else {
        console.log("error nuevo jajajaja.");
    }
});

