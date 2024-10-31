import fs from "fs";
import { onEvent, startServer } from "soquetic";

onEvent('registro', enviarRegistro);
onEvent('login', enviarLogin);
onEvent('guardarDiseno', guardarDiseno); 
onEvent('obtenerDisenos', enviarDisenos);
onEvent('borrarDisenos', borrarDisenos);
onEvent('mandarAImprimir', mandarAImprimir);
onEvent('uploadImage', subirImagen);
onEvent('uploadImagecustom', subirImagencustom);

function guardarDiseno(data) {
    try {
        fs.readFile('../data/diseños.json', 'utf-8', (err, content) => {
            if (err) throw new Error("Error al leer el archivo");

            let diseños = JSON.parse(content);

            const existeDiseno = diseños.filter(d => d.nombret === data.nombretp);
            if (existeDiseno.length > 0) {
                console.log("El diseño ya existe");
                return { ok: false, message: "El diseño ya existe" };
            }

            diseños.push(data);

            fs.writeFile('../data/diseños.json', JSON.stringify(diseños, null, 2), (err) => {
                if (err) throw new Error("Error al guardar el diseño");
                console.log("Diseño guardado exitosamente");
                return { ok: true, message: "Diseño guardado" };
            });
        });
    } catch (error) {
        console.error("Error:", error.message);
        return { ok: false, message: error.message };
    }
}

function enviarRegistro(data) {
    let usuarios = JSON.parse(fs.readFileSync('../data/usuarios.json', 'utf-8'));

    const usuarioExistente = usuarios.filter(user => user.username === data.username);

    if (usuarioExistente.length > 0) {
        console.log("El usuario ya existe");
        return { ok: false, message: "El usuario ya existe" };
    }

    usuarios.push({ username: data.username, password: data.password });
    fs.writeFileSync('../data/usuarios.json', JSON.stringify(usuarios, null, 2));
    console.log("Registro exitoso");
    return { ok: true, message: "Registro exitoso" };
}


function enviarLogin(data) {
    let usuarios = JSON.parse(fs.readFileSync('../data/usuarios.json', 'utf-8'));

    for (let user of usuarios) {
        if (user.username === data.username && user.password === data.password) {
            console.log("Login exitoso");
            return { ok: true, message: "listo" };
        }
    }

    console.log("Crea una cuenta");
    return { ok: false,  };
    
}

function enviarDisenos() {
    let diseños = JSON.parse(fs.readFileSync('../data/diseños.json', 'utf-8'));

    const nombresDiseñadores = diseños.map(d => d.username);
    console.log("Diseñadores:", nombresDiseñadores);

    return { ok: true, diseños };
}

function borrarDisenos() {
    fs.writeFileSync('../data/diseños.json', '[]', 'utf-8');
    console.log("Diseños borrados");
    return { ok: true, message: "Diseños borrados" };
}

function mandarAImprimir(data) {
    fs.writeFileSync('../data/imprimir.json', JSON.stringify(data, null, 2));
    console.log("Diseño enviado a imprimir");
    return { ok: true, message: "Diseño enviado a imprimir" };
}

function subirImagen(data) {
    const { username, image, fileName } = data;

    if (!image || !username || !fileName) {
        console.log("Faltan datos");
        return { ok: false, message: "Datos incompletos" };
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const nombrei = `../imgfin/${fileName}`;

    fs.writeFileSync(nombrei, base64Data, 'base64');
    console.log(`Imagen subida por ${username} guardada en ${nombrei}`);
    return { ok: true, message: "Imagen guardada", fileName };
}

function subirImagencustom(data) {
    const { username, image, fileName } = data;

    if (!image || !username || !fileName) {
        console.log("Faltan datos");
        return { ok: false, message: "Datos incompletos" };
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const nombrei = `../imagenesa/${fileName}`;

    if (fs.existsSync('../imagenesa')) {
        fs.writeFileSync(nombrei, base64Data, 'base64');
        console.log(`Imagen subida por ${username} guardada en ${nombrei}`);
        return { ok: true, message: "Imagen guardada", fileName };
    } else {
        console.log("La carpeta 'imagenesa' no existe");
        return { ok: false, message: "La carpeta 'imagenesa' no existe" };
    }
}

startServer();
