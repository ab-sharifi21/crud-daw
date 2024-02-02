import { borrarDatos, crearContenidoEnSection, seleccionElementos, imxsGuardarOEditar } from "./helpers.js";

function preparandoDatos(datos) {

  crearContenidoEnSection(datos); 
  borrarDatos(seleccionElementos('.borrar'));
  imxsGuardarOEditar('guardar');
  imxsGuardarOEditar('editar');
}//preparandoDatos(datos)



async function preguntarDatos() {
  let datosLeidos = await fetch("/lecturadatos");
  let datosJson = await datosLeidos.json();

  preparandoDatos(datosJson);
}

export { preguntarDatos };
