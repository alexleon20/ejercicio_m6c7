//clase 7
//falta modificar el comando nodemon
const express = require('express');
const axios = require("axios");
const uuid = require("uuid");
const moment = require("moment");
const chalk = require("chalk");

moment.locale('es');

const app = express()

app.use(express.static('public'))

function get_cita(){
    const ahora = Date.now()
    const tomorrow = ahora + 24 * 60 * 60 * 1000
    const dos_meses = ahora + 24 * 60 * 60 * 1000 * 60

    const cita_ms = Math.random() * (dos_meses - tomorrow) + tomorrow;
    return new Date(cita_ms)
}

console.log(get_cita())

const arreglo_usuarios = [];
async function llenar() {
    const { data } = await axios.get("https://randomuser.me/api/?results=10");
    //console.log(data.results);
    for (let user of data.results) {
        const nombre = user.name.first;
        const apellido = user.name.last;
        const id = uuid.v4();
        const fecha_cita = get_cita();
        const nuevo_arreglo = {
            nombre,
            apellido,
            id,
            fecha_solicitud: moment().format('LLL'),
            fecha_cita,
        };
        arreglo_usuarios.push(nuevo_arreglo)
    }
    console.log(chalk.bgWhite(chalk.blue(JSON.stringify(arreglo_usuarios))));
}

llenar();

console.log(get_cita())

app.get('/cliente', (req, res) => {
    res.json({ arreglo_usuarios })
});


app.listen(3000, () => console.log('ejecutando en puerto 3000'))