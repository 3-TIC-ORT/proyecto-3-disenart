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

    const usuarioEncontrado = usuarios.filter(user => user.username === data.username && user.password === data.password);

    if (usuarioEncontrado.length > 0) {
        console.log("Login exitoso");
        return { ok: true, message: "listo" };
    }

    console.log("Crea una cuenta");
    return { ok: false, message: "Crea una cuenta" };
}


function guardarDiseno(data) {
    let diseños = JSON.parse(fs.readFileSync('../data/diseños.json', 'utf-8'));

    diseños.push({
        username: data.username,
        color: data.color,
        talle: data.talle,
        material: data.material,
        nombretp: data.nombretp,
        imagen: data.imageUrl,
        nombrePersona: data.nombrePersona,
        lugarn: data.positionOption,
        colorn: data.selectedColor,
        colorLinea: data.colorLinea,
        formato: data.formato,
        posicionTexto: data.posicionTexto,
        texto: data.textoPersonalizado,
        subtextoi: data.subtextoPersonalizado,
        posicionsubTexto: data.posicionsubTexto,
        posicionfoto: data.posicionfoto,
        foto: data.fileName,
        url: data.urlcompartido
    });

    fs.writeFileSync('../data/diseños.json', JSON.stringify(diseños, null, 2));
    console.log("Diseño guardado exitosamente");
    return { ok: true, message: "Diseño guardado" };
}

function enviarDisenos() {
    let diseños = JSON.parse(fs.readFileSync('../data/diseños.json', 'utf-8'));
    return { ok: true, diseños };
}

function borrarDisenos() {
    fs.writeFileSync('../data/diseños.json', '[]', 'utf-8');
    console.log("Diseños borrados");
    return { ok: true, message: "Diseños borrados" };
}

function mandarAImprimir(data) {
    const diseñoParaImprimir = {
        username: data.username,
        color: data.color,
        talle: data.talle,
        material: data.material,
        nombretp: data.nombretp,
        imagen: data.imageUrl,
        nombrePersona: data.nombrePersona,
        lugarn: data.positionOption,
        colorn: data.selectedColor,
        colorLinea: data.colorLinea,
        formato: data.formato,
        posicionTexto: data.posicionTexto,
        texto: data.textoPersonalizado,
        subtextoi: data.subtextoPersonalizado,
        posicionsubTexto: data.posicionsubTexto,
        posicionfoto: data.posicionfoto,
        foto: data.fileName,
        url: data.urlcompartido
    };

    fs.writeFileSync('../data/imprimir.json', JSON.stringify(diseñoParaImprimir, null, 2));
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
        console.log("La carpeta 'imagenes' no existe");
        return { ok: false, message: "La carpeta 'imagenes' no existe" };
    }
}

startServer();
