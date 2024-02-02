const { MongoClient } = require("mongodb");
const url = process.env.URLMONGO;
const client = new MongoClient(url);
const database = process.env.BBDD;
const coleccion = process.env.COLECCION;

//BORRAR DATOS

async function fActualizarDatos(req,res){
    
        
     try {
        console.log('req.body: ',req.body)
        await client.connect();
        // BBDD y coleccion van aqui
        //const { id } = req.params;
       
        const db = client.db(database);
        const coll = db.collection(coleccion);
        const filtro = {
            _id: parseInt(req.body.id)
        }
        const dato = {
            $set: req.body.campos,
          }
        const result = await coll.updateOne(filtro,dato);
        console.log("Number of documents updated: " + result.modifiedCount,result);
        
        console.log('Resuldato de borrado de dato',result) 
    } finally {
        //asegurar q el cliente cierra cuando acaba/error
        
        await client.close();
  
    } 
}
module.exports = {fActualizarDatos};




//({_id:1},{$set:{editorial:["outro valor"]}})
