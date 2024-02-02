import { _servindoOServer } from "./comunicacion/with_server.js";
import { metodos, objetoDatos } from "./datos.js";

function seleccionTarefaARealizar(id, tarefaArealizar, datos) {
  let metodo = "";
  let endpoint = "";

  if (tarefaArealizar === "borrar") {
    metodo = metodos.delete.metodo;
    endpoint = metodos.delete.endpoint;
  }
  if (tarefaArealizar === "actualizar") {
    metodo = metodos.put.metodo;
    endpoint = metodos.put.endpoint;
  }
  _servindoOServer(id, metodo, endpoint, datos);
}

function borrarDatos(refLista) {
  for (let refElemento of refLista) {
    refElemento.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("id");
      let tarefaArealizar = e.target.getAttribute("class");

      e.stopImmediatePropagation();
      seleccionTarefaARealizar(id, tarefaArealizar, null);
    });
  }
}

function crearDiv(documento) {
  const div = document.createElement("div");
  div.setAttribute("id", `${documento._id}`);
  document.querySelector(".lista").append(div);
  return div;
}

function crearInput(documento, div) {
  let tamanhio = Object.keys(documento).length;
  let elementos = Object.values(documento);
  let claves = Object.keys(documento);

  for (let contador = 0; contador < tamanhio; contador++) {
    let _input2 = document.createElement("input");
    _input2.setAttribute("readonly", "true");
    _input2.setAttribute("name", `${claves[contador]}`);
    _input2.setAttribute("value", `${elementos[contador]}`);

    if (Array.isArray(elementos[contador])) {
      for (
        let contador2 = 0;
        contador2 < elementos[contador].length;
        contador2++
      ) {
        let _input3 = document.createElement("input");
        _input3.setAttribute("readonly", "true");
        _input3.innerHTML += elementos[contador][contador2];
        _input2.append(_input3);
      }
    }

    _input2.innerHTML += elementos[contador];
    div.append(_input2);
  }
  // return input;
}

function crearContenidoEnSection(datos) {
  datos.documentos.map((documento) => {
    let _div = crearDiv(documento);
    crearInput(documento, _div);

    let imax = ["borrar", "editar", "guardar"];
    for (let imaxenes of imax) {
      let imx = document.createElement("img");
      imx.setAttribute("src", `./assets/${imaxenes}.png`);
      imx.setAttribute("class", `${imaxenes}`);
      _div.append(imx);
    }
  });
}

const seleccionElementos = (etiqueta) => {
  const _etiqueta = document.querySelectorAll(etiqueta);
  return _etiqueta;
};

function seleccionarInput() {
  const nomes = [];
  for (let _input of seleccionElementos("input")) {
    _input.addEventListener("click", (e) => {
      e.target.removeAttribute("readonly");
      nomes[0] = e.target.parentElement.getAttribute("id");
      nomes.push(e.target.getAttribute("name"));
      e.target.style.backgroundColor = "blue";
      e.target.style.color = "white";
    });
  }
  return nomes;
}

function seleccionarInputConBotonEditar(nomes) {
  let _imxsEditar = seleccionElementos(".editar");
  for (let contador = 0; contador < _imxsEditar.length; contador++) {
    _imxsEditar[contador].addEventListener("click", (e) => {
      nomes[0] = parseInt(e.target.parentElement.getAttribute("id"));
      nomes.push(e.target.getAttribute("name"));
      let elementosARecorrer = e.target.parentElement.childNodes;
      for (let elemento of elementosARecorrer) {
        if (elemento.getAttribute("readonly") === "true") {
          elemento.style.backgroundColor = "green";
          elemento.style.color = "white";
          elemento.removeAttribute("readonly");
        }
      }
    });
  }
}

function modificarValorInput(e, nomes) {
  let idPulsado = e.target.parentElement.getAttribute("id");
  if (idPulsado == nomes[0]) {
    let _inputArray = e.target.parentElement.querySelectorAll("input");
    let tamanaioDiv = e.target.parentElement.querySelectorAll("input").length;
    let contador2 = 0;
    let tamanioNomes = nomes.length;

    for (contador2; contador2 < tamanaioDiv; contador2++) {
      let contadorNomes = 1;

      for (contadorNomes; contadorNomes < tamanioNomes; contadorNomes++) {
        let atributoName = _inputArray[contador2].getAttribute(`name`);
        let atributoModificado = nomes[contadorNomes];
        if (atributoName == atributoModificado) {
          // console.log("atributoName ", atributoName);
          // console.log("atributoModificado ", atributoModificado);
          // console.log("idPulsado: ", idPulsado);
          // console.log(
          //   "_inputArray[contador2].value ",
          //   _inputArray[contador2].value
          // );
          objetoDatos.campos[`${atributoName}`] = _inputArray[contador2].value;
          objetoDatos.id = idPulsado;
        }
      }
    }
    console.log("dato: ", objetoDatos);
    seleccionTarefaARealizar(objetoDatos.id, "actualizar", objetoDatos);
  }
}

function pulsarBotonGuardar(nomes) {
  let _imxsGuardar = seleccionElementos(".guardar");

  for (let contador1 = 0; contador1 < _imxsGuardar.length; contador1++) {
    _imxsGuardar[contador1].addEventListener("click", (e) => {
      modificarValorInput(e, nomes);
    });
  }
}

function imxsGuardarOEditar(_imxs) {
  let nomes = seleccionarInput();

  if (seleccionElementos(".guardar")[0].getAttribute("class") === _imxs) {
    pulsarBotonGuardar(nomes);
  }

  if (seleccionElementos(".editar")[0].getAttribute("class") === _imxs) {
    seleccionarInputConBotonEditar(nomes);
  }
}

export {
  borrarDatos,
  seleccionTarefaARealizar,
  crearContenidoEnSection,
  seleccionElementos,
  imxsGuardarOEditar,
};
