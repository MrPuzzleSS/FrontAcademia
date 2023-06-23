
const cargarDocentes = async () => {
  const url = 'https://backacademiaapi.onrender.com/api/docente';
  let select = document.getElementById('docente');
  select.innerHTML = ''; // Limpiar opciones existentes
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function (data) {
      let listaDocentes = data.docentes; // Capturar el array devuelto por la api
      listaDocentes.forEach(function (docente) { // Recorrer el 
        let opcion = document.createElement('option');
        opcion.value = docente.nombre; // Asignar el valor del grupo (puedes usar cualquier propiedad del grupo que desees)
        opcion.textContent = docente.nombre; // Asignar el nombre del grupo (puedes usar cualquier propiedad del grupo que desees)
        select.appendChild(opcion);
      });
    });
};

const cargarGrupos = async () => {
  const url = 'https://backacademiaapi.onrender.com/api/grupo';
  let select = document.getElementById('grupo');
  select.innerHTML = ''; // Limpiar opciones existentes
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function (data) {
      let listaGrupos = data.grupos; // Capturar el array devuelto por la api
      listaGrupos.forEach(function (grupo) { // Recorrer el 
        let opcion = document.createElement('option');
        opcion.value = grupo.nombre; // Asignar el valor del grupo (puedes usar cualquier propiedad del grupo que desees)
        opcion.textContent = grupo.nombre; // Asignar el nombre del grupo (puedes usar cualquier propiedad del grupo que desees)
        select.appendChild(opcion);
      });
    });
};