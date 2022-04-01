const btnAgregar = document.querySelector("#btnAgregar");
const listaUnicornios = document.querySelector("#lista");
const nombre = document.querySelector("#nombre");
const poder = document.querySelector("#poder");
const edad = document.querySelector("#edad");
const imagen = document.querySelector("#imagen");

const nombreEdit = document.querySelector("#nombreEdit");
const edadEdit = document.querySelector("#edadEdit");
const poderEdit = document.querySelector("#poderEdit");
const imagenEdit = document.querySelector("#imagenEdit");
var unicornio;
//Functions

//agregar nuevo unicornio
function crearUnicornio() {
  const unicornio = {
    name: nombre.value,
    power: poder.value,
    image: imagen.value,
    age: edad.value,
  };
  const fetchConfig = {
    method: "POST",
    body: JSON.stringify(unicornio),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns", fetchConfig)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      limpiarForm();
      listarUnicornios();
    })
    .catch((err) => {
      console.log(err);
    });
  alert("Registro exitoso");
}

//listar unicornios
function listarUnicornios() {
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns")
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      mostrarUnicornios(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

//eliminar unicornio
function eliminarUnicornio(unicornid) {
  const fetchConfig = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(
    "https://unicorns-api.herokuapp.com/api/v1/unicorns/" + unicornid,
    fetchConfig
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      listarUnicornios();
    })
    .catch((err) => {
      console.log(err);
    });
  alert("Unicornio eliminado");
}

//Seleccionar unicornio
function seleccionarUnicornio(unicornid) {
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns/" + unicornid)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      unicornio = result._id;
      nombreEdit.value = result.name;
      poderEdit.value = result.power;
      edadEdit.value = result.age;
      imagenEdit.value = result.image;
    })
    .catch((err) => {
      console.log(err);
    });
}

//modificar unicornio
//eliminar unicornio
function modificarUnicornio() {
  const unicornioEdit = {
    name: nombreEdit.value,
    power: poderEdit.value,
    image: imagenEdit.value,
    age: edadEdit.value,
  };

  const fetchConfig = {
    method: "PUT",
    body: JSON.stringify(unicornioEdit),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(
    "https://unicorns-api.herokuapp.com/api/v1/unicorns/" + unicornio,
    fetchConfig
  )
    .then((result) => {
      console.log(result.json);
      return result.json();
    })
    .then((result) => {
      limpiarForm();
      listarUnicornios();
      alert("Unicornio modificado");
    })
    .catch((err) => {
      console.log(err);
    });
}
//mostrar unicornios
function mostrarUnicornios(arrayUnicornios) {
  listaUnicornios.innerHTML = "";

  arrayUnicornios.forEach((unicornio) => {
    //creamos el div card
    const card = document.createElement("div");
    card.className = "card";
    let img = `<img src=${unicornio.image} alt=${unicornio.image}>`;
    card.innerHTML = img;
    const cardContenido = document.createElement("div");
    cardContenido.className = "card_group";
    let contenido = `
    <div class="card_contenido"> <h3>Nombre</h3> <p>${unicornio.name}</p></div>
    <div class="card_contenido"> <h3>Poder</h3> <p>${unicornio.power}</p></div>
    <div class="card_contenido"> <h3>Edad</h3> <p>${unicornio.age}</p></div>
    <button id="btnEliminar" onclick="eliminarUnicornio('${unicornio._id}')" type="button">Eliminar</button>
    <button id="btnSeleccionar" onclick="seleccionarUnicornio('${unicornio._id}')" type="button">Seleccionar</button>
    `;
    cardContenido.innerHTML = contenido;
    card.appendChild(cardContenido);
    listaUnicornios.appendChild(card);
    //
  });
}

// Limpia el valor de los inputs
function limpiarForm() {
  nombre.value = "";
  poder.value = "";
  imagen.value = "";
  edad.value = "";
  nombreEdit.value = "";
  poderEdit.value = "";
  imagenEdit.value = "";
  edadEdit.value = "";
  unicornio = 0;
}

// Le agregamos el evento click al boton
btnAgregar.addEventListener("click", crearUnicornio);
listarUnicornios();
