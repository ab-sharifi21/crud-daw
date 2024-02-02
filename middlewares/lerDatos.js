require('dotenv').config();
const { MongoClient } = require("mongodb");
const url = process.env.URLMONGO;
const client = new MongoClient(url);
const database = process.env.BBDD;
const coleccion = process.env.COLECCION;

// LEER DATOS 

async function fLerDatos(req,res) {
    let envio = {};
    try {
        await client.connect();
        // BBDD y coleccion van aqui
        const db = client.db(database);
        const coll = db.collection(coleccion);
        // find va aqui
        const dbFind = coll.find({});
        // codigo iterativo va aqui
        let documentos = [];
        for await(let documento of dbFind){
            // console.log("dato leido", documento)
            documentos.push(documento);
        }
        envio.documentos = documentos;
    } finally {
        //asegurar q el cliente cierra cuando acaba/error
        await client.close();
        //let obxeto = {enviados:"enviando datos..."}
        res.send(envio);
    }
}
module.exports = {fLerDatos}; 