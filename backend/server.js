import fs from "fs";
import { onEvent, startServer } from "soquetic";

onEvent('registro', enviarRegistro);
onEvent('login', enviarLogin);
onEvent('guardarDiseno', guardarDiseno);
onEvent('obtenerDisenos', enviarDisenos);
onEvent('borrarDisenos', borrarDisenos);
onEvent('mandarAImprimir', mandarAImprimir);

function enviarRegistro(data) {
    let usuarios = JSON.parse(fs.readFileSync('../data/usuarios.json', 'utf-8'));
    
    for (let user of usuarios) {
        if (user.username === data.username) {
            console.log("ya existe");
            return { ok: false, message: "ya existe" };
        }
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

    console.log("create un cuenta ");
    return { ok: false, message: "Create una cuenta capo" };
}


function guardarDiseno(data) {
    let diseños = JSON.parse(fs.readFileSync('../data/diseños.json', 'utf-8'));

    
    diseños.push({ username: data.username, color: data.color, talle: data.talle, material: data.material, nombret: data.nombretp });
    
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
        nombretp: data.nombretp
    };

    fs.writeFileSync('../data/imprimir.json', JSON.stringify(diseñoParaImprimir, null, 2));
    console.log("Diseño enviado a imprimir");
    return { ok: true, message: "Diseño enviado a imprimir" };
}

startServer();