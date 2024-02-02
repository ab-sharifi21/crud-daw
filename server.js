require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

//Utilizamos as funcións utilizadas para mongodb

const { 
  fLerDatos,
  fBorrarDatos,
  fActualizarDatos } = require("./middlewares/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "public")));
// A partir de aqui establecense os endpoint do BACKEND
// app.get recupera os datos pedidos anteriormente
/*app.get("/lecturadatos",(req,res) => {
    let obxeto = {enviados:"enviando datos..."}
    res.send(obxeto);
});*/
//app.get("/borradodatos/:id",fBorrarDatos)
app.get("/lecturadatos",fLerDatos)
//app.get("/borradodatos/:id",fBorrarDatos) // OK era o tema de parseInt
app.delete("/borradodatos/:id",fBorrarDatos)

//app.get("/borradodatos",fBorrarDatos)
//app.delete("/borradodatos",fBorrarDatos)

app.put("/modificadodatos",fActualizarDatos)

//INICIAR SERVIDOR
app.listen(4000, function() {
  console.log("Server running");
});