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
const uploadCustomImageButton = document.getElementById('uploadCustomImageButton');
const uploadImageCustomInput = document.getElementById('uploadImageCustom');
const guardarImagenButton = document.getElementById("guardarImagenButton")
const urlcompartido = document.getElementById("urlC")


let loggedInUser = null;

registerButton.addEventListener("click", () => {
    const username = registerUsernameInput.value;
    const password = registerPasswordInput.value;

    if (username && password) {
        postData('registro', { username, password }, (response) => {
            if (response.ok) {
                formregistro.style.display = "none";
                formsecion.style.display = "block";
                document.body.style.background = "none";

            } else {
                document.getElementById("tuParrafo").textContent = "Esta cuenta ya existe";
            }
        });
    } 
});

loginButton.addEventListener("click", () => {
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    if (username && password) {
        postData('login', { username, password }, (response) => {
            if (response.ok) {
                loggedInUser = username;
            } else {
                document.getElementById("miParrafo").textContent = "Esta cuenta no existe";
            }
        });
    } else {
        alert("Completa todo");
    }
});


loginButton.addEventListener("click", () => {
    const nombreu = loginUsernameInput.value;
    document.getElementById("usuarioc").innerHTML = nombreu;
});

const userc = "./pantallasD/usuarioimg.png"




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
    const fileName = uploadedFileName || "";
    const positionOption = positionSelect.value;
    const selectedColor = colorLetraSelect.value; 
    const colorLinea = colorLineaSelect.value;
    const formato = formatoSelect.value;
    const posicionTexto = posicionTextoSelect.value;
    const textoPersonalizado = textoPersonalizadoInput.value;
    const subtextoPersonalizado = subtextoPersonalizadoInput.value;
    const posicionsubTexto = posicionsubTextoSelect.value;
    const posicionfoto = posicionFOTOSelect.value;
    const urlcompartido = urlC.value;

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
            subtextoPersonalizado,
            posicionfoto,
            fileName,
            urlcompartido
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
                li.textContent = diseño.nombretp;

                const deleteButton = document.createElement("button");
                
                deleteButton.style.marginLeft = "10px"; 
                deleteButton.style.cursor = "pointer";
                deleteButton.style.backgroundImage = "url('../pantallasD/tacho.png')"; 
                deleteButton.style.backgroundSize = "contain"; 
                deleteButton.style.backgroundRepeat = "no-repeat"; 
                deleteButton.style.border = "none"; 
                deleteButton.style.height = "10px"; 
                deleteButton.style.width = "10px"; 

                deleteButton.addEventListener("click", (event) => {
                    event.stopPropagation(); 
                    const confirmation = confirm("¿Deseas borrar este diseño de la lista visual?");
                    if (confirmation) {
                        li.remove(); 
                        alert("Diseño eliminado de la lista visual.");
                    }
                });

                li.appendChild(deleteButton);

                li.addEventListener("click", () => {
                    
                    colorSelect.value = diseño.color;
                    materialSelect.value = diseño.material;
                    nombreTrabajo.value = diseño.nombretp;
                    nombrePersonaInput.value = diseño.nombrePersona;
                    positionSelect.value = diseño.positionOption;
                    colorLetraSelect.value = diseño.selectedColor;
                    colorLineaSelect.value = diseño.colorLinea;
                    formatoSelect.value = diseño.formato;
                    posicionTextoSelect.value = diseño.posicionTexto;
                    textoPersonalizadoInput.value = diseño.textoPersonalizado;
                    talleSelect.value = diseño.talle;
                    posicionsubTextoSelect.value = diseño.posicionsubTexto;
                    subtextoPersonalizadoInput.value = diseño.subtextoPersonalizado;
                    posicionFOTOSelect.value = diseño.posicionfoto;
                    urlC.value = diseño.urlcompartido;

                    const imagePath = `../imagenesa/${diseño.fileName}`;
                    const imageContainer = document.getElementById("imagencus");
                    imageContainer.innerHTML = ""; 

                    const imageElement = document.createElement('img');
                    imageElement.src = imagePath;
                    imageElement.style.maxWidth = '100%'; 
                    imageElement.style.height = 'auto';

                    imageContainer.appendChild(imageElement);
                    imageContainer.style.display = "block";

                    const imageUrl = colorToImageMap[diseño.color];
                    
                    if (imageUrl) {
                        imagenColor.src = imageUrl;
                        imagenColor.style.display = "block";  
                    } else {
                        imagenColor.src = "";
                        imagenColor.style.display = "none";  
                    }
                });
                designList.appendChild(li);
            });
        } else {
            console.error("Error al cargar", response.message);
        }
    });
});

uploadImageCustom.value = ''; 


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
    const imageUrl = colorToImageMap[color]  || ""; 
    const nombrePersona = nombrePersonaInput.value;  
    const positionOption = positionSelect.value;
    const selectedColor = colorLetraSelect.value; 
    const colorLinea = colorLineaSelect.value;
    const formato = formatoSelect.value
    const posicionTexto = posicionTextoSelect.value
    const textoPersonalizado = textoPersonalizadoInput.value
    const subtextoPersonalizado = subtextoPersonalizadoInput.value
    const posicionsubTexto = posicionsubTextoSelect.value
    const posicionfoto = posicionFOTOSelect.value
    const fileName = uploadedFileName || "";
    const urlcompartido = urlC.value
    




    if (loggedInUser) {
        postData('mandarAImprimir', { username: loggedInUser, color, talle, material, nombretp, imageUrl, nombrePersona, positionOption, selectedColor, formato, colorLinea, posicionTexto, textoPersonalizado, posicionsubTexto, subtextoPersonalizado, posicionfoto, fileName, urlcompartido }, (response) => {
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


let nameTopPosition = 315;

positionSelect.addEventListener("change", () => {
    const selectedOption = positionSelect.value;

    if (selectedOption === "arriba") {
        nameTopPosition = 315; 
    } else if (selectedOption === "abajo") {
        nameTopPosition = 470; 
    }

    
    nameOverlay.style.top = `${nameTopPosition}px`;
});

colorLetraSelect.addEventListener("change", () => {
    const selectedColor = colorLetraSelect.value; 
    nameOverlay.style.color = selectedColor;
    subtexto.style.color = selectedColor; 
});

let textoTopPosition = 350;
let textoLeftPosition = 130;  

posicionTexto.addEventListener("change", () => {
    const selectedOption2 = posicionTexto.value;

    if (selectedOption2 === "arriba-atras") {
        textoTopPosition = 330; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "abajo-atras") {
        textoTopPosition = 475; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "medio-atras") {
        textoTopPosition = 380; 
        textoLeftPosition = 375;  
    } else if (selectedOption2 === "arriba-adelante") {
        textoTopPosition = 330; 
        textoLeftPosition = 130;  
    } else if (selectedOption2 === "medio-adelante") {
        textoTopPosition = 375; 
        textoLeftPosition = 130;  
    } else if (selectedOption2 === "abajo-adelante") {
        textoTopPosition = 475; 
        textoLeftPosition = 130;  
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

let subtextoTopPosition = 345;
let subtextoLeftPosition = 130;  


posicionsubTexto.addEventListener("change", () => {
    const selectedOption3 = posicionsubTexto.value;

    if (selectedOption3 === "arriba-atras") {
        subtextoTopPosition = 345; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "abajo-atras") {
        subtextoTopPosition = 490; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "medio-atras") {
        subtextoTopPosition = 395; 
        subtextoLeftPosition = 375;  
    } else if (selectedOption3 === "arriba-adelante") {
        textoTopPosition = 345;
        subtextoLeftPosition = 30;  
    } else if (selectedOption3 === "medio-adelante") {
        subtextoTopPosition = 390; 
        subtextoLeftPosition = 130;  
    } else if (selectedOption3 === "abajo-adelante") {
        subtextoTopPosition = 490; 
        subtextoLeftPosition = 130;  
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
            recBlanco1.style.left = "63px";
            recBlanco1.style.width = "130px";
            recBlanco1.id = "recBlanco1";

            
            recBlanco2 = document.createElement("img");
            recBlanco2.src = newSrc;
            recBlanco2.style.position = "absolute";
            recBlanco2.style.top = "380px";
            recBlanco2.style.left = "314px";
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
            recBlanco1.style.top = "400px";
            recBlanco1.style.left = "15px";
            recBlanco1.style.width = "250px";
            recBlanco1.style.height = "25px"
            recBlanco1.style.transform = "rotate(-60deg)";
            recBlanco1.id = "recBlanco1";

            
            recBlanco2 = document.createElement("img");
            recBlanco2.src = newSrc;
            recBlanco2.style.position = "absolute";
            recBlanco2.style.top = "400px";
            recBlanco2.style.left = "260px";
            recBlanco2.style.width = "250px";
            recBlanco2.style.height = "25px"
            recBlanco2.style.transform = "rotate(-60deg)";
            recBlanco2.id = "recBlanco2";

            document.body.appendChild(recBlanco1);
            document.body.appendChild(recBlanco2);
    } } else if (selectedFormato=== "ben10"){

        const selectedColor = colorLineaSelect.value; 
        const newSrc = colorMap[selectedColor]; 

        if (newSrc) {
            
            recBlanco1 = document.createElement("img");
            recBlanco1.src = newSrc;
            recBlanco1.style.position = "absolute";
            recBlanco1.style.top = "400px";
            recBlanco1.style.left = "20px";
            recBlanco1.style.width = "210px";
            recBlanco1.style.height = "32px"
            recBlanco1.style.transform = "rotate(90deg)";
            recBlanco1.id = "recBlanco1";

            
            recBlanco2 = document.createElement("img");
            recBlanco2.src = newSrc;
            recBlanco2.style.position = "absolute";
            recBlanco2.style.top = "390px";
            recBlanco2.style.left = "266px";
            recBlanco2.style.width = "220px";
            recBlanco2.style.height = "38px"
            recBlanco2.style.transform = "rotate(90deg)";
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

let uploadedImageBase64 = "";  
let uploadedFileName = "";

uploadCustomImageButton.addEventListener("click", () => {
    const file = uploadImageCustomInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function() {
            const base64Image = reader.result;
            uploadedImageBase64 = reader.result; 
            uploadedFileName = file.name; 

            const imageElement = document.createElement('img');
            imageElement.src = base64Image;
            imageElement.style.maxWidth = '130px'; 
            imageElement.style.height = 'auto';
            
            const imageContainer = document.getElementById("imagencus");
            imageContainer.innerHTML = ""; 
            imageContainer.appendChild(imageElement);

            
            const posicionSelect = document.getElementById("posicionFOTOSelect").value;
            if (posicionSelect === "atras") {
                imageContainer.style.left = "380px";  
                imageContainer.style.top = "365px"; 
            } else if (posicionSelect === "adelante") {
                imageContainer.style.left = "130px"; 
            }
        };

        reader.readAsDataURL(file);
    } else {
        alert("Selecciona un archivo de imagen.");
    }
});

guardarImagenButton.addEventListener("click", () => {
    if (uploadedImageBase64 && loggedInUser) {
        const fileName = uploadImageCustomInput.files[0].name;

        postData('uploadImagecustom', {
            username: loggedInUser,
            image: uploadedImageBase64,
            fileName: fileName,
            folder: 'imagenesa'
        }, (response) => {
            if (response.ok) {
                alert("Imagen guardada exitosamente en la carpeta imagenesa.");
            } else {
                alert("Error al guardar la imagen.");
            }
        });
    } else {
        alert("No se ha adjuntado ninguna imagen o no has iniciado sesión.");
    }
});