const url = 'https://backacademiaapi.onrender.com/api/grupo'
const listarDatos = async () => {
  let respuesta = ''
  let body = document.getElementById('contenido')
  //url: Es la url de la api.
  //Al deslpegarla en el servidor colocar la api del servidor
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function (data) {
      let listaGrupos = data.grupos //Capturar el array devuelto por la api
      datos =
        listaGrupos.map(function (grupo) {//Recorrer el array
          respuesta += `<tr><td>${grupo.nombre}</td>` +
            `<td>${grupo.asignatura}</td>` +
            `<td>${grupo.estado}</td>` +
            `<td><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(grupo)})' >Editar</a> 
            <a class="btn btn-danger" onclick='eliminar(${JSON.stringify(grupo)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

const editar = (grupo) => {
  document.getElementById('nombre').value = ''
  document.getElementById('asignatura').value = ''
  document.getElementById('estado').value = ''

  document.getElementById('nombre').value = grupo.nombre
  document.getElementById('asignatura').value = grupo.asignatura
  document.getElementById('estado').value = grupo.estado
}

const eliminar = (nombre) => {
  const url = 'https://backacademiaapi.onrender.com/api/grupo';

  Swal.fire({
    title: 'Estas Seguro?',
    text: "Se eliminara completamente!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      let grupo = {
        nombre: nombre.nombre
      }

      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(grupo),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
          Swal.fire(
            json.msg,
            ' ',
            'success'
          )
          setTimeout(() => {
            window.location.href = '/grupos';
          }, 1800);
        })
    }
  })
}

const actualizar = async () => {

  let _nombre = document.getElementById('nombre').value
  let _asignatura = document.getElementById('asignatura').value
  let _estado = document.getElementById('estado').value
  const url = 'https://backacademiaapi.onrender.com/api/grupo';

  let grupo = {
    nombre: _nombre,
    asignatura: _asignatura,
    estado: _estado
  }

  if ((_nombre !== '') && (_asignatura !== '') && (_estado !== '')) {
    try {
      // Enviar una solicitud POST al servidor
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(grupo),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        // Mostrar mensaje de éxito
        Swal.fire(data.msg, 'El grupo se actualizo correctamente!', 'success');

        setTimeout(() => {
          window.location.href = '/grupos';
        }, 3000);
      } else {
        // Mostrar mensaje de error
        Swal.fire('Hubo un error en el registro.', 'Haz clic en el botón!', 'error');
      }
    } catch (error) {
      // Mostrar mensaje de error en caso de falla en la solicitud
      Swal.fire('Hubo un error en el registro.', 'Haz clic en el botón!', 'error');
    }
  } else {
    // Mostrar mensaje de error si faltan campos obligatorios
    Swal.fire('Falta información obligatoria.', 'Haz clic en el botón!', 'error');
  }
}

if (document.getElementById('btnCrearGrupo')) {
  document.addEventListener('DOMContentLoaded', function () {
    let button = document.getElementById('btnCrearGrupo');
    button.addEventListener('click', function () {
      window.location.href = "/crearGrupos";
    });
  });
}


if (document.querySelector('#btnGuardar')) {
  document.querySelector('#btnGuardar')
    .addEventListener("click", () => { actualizar() })
}