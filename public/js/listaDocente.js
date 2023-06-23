const url = 'https://backacademiaapi.onrender.com/api/docente'
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
      let listaDocentes = data.docentes //Capturar el array devuelto por la api
      datos =
        listaDocentes.map(function (docente) {//Recorrer el array
          respuesta += `<tr><td>${docente.nombre}</td>` +
            `<td>${docente.apellido}</td>` +
            `<td>${docente.correo}</td>` +
            `<td>${docente.celular}</td>` +
            `<td>${docente.estado}</td>` +
            `<td><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(docente)})' >Editar</a> 
            <a class="btn btn-danger" onclick='eliminar(${JSON.stringify(docente)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

const editar = (docente) => {
  document.getElementById('nombre').value = ''
  document.getElementById('apellido').value = ''
  document.getElementById('correo').value = ''
  document.getElementById('celular').value = ''
  document.getElementById('estado').value = ''

  document.getElementById('nombre').value = docente.nombre
  document.getElementById('apellido').value = docente.apellido
  document.getElementById('correo').value = docente.correo
  document.getElementById('celular').value = docente.celular
  document.getElementById('estado').value = docente.estado
}

const eliminar = (nombre) => {
  const url = 'https://backacademiaapi.onrender.com/api/docente';

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
      let docente = {
        nombre: nombre.nombre
      }

      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(docente),//Convertir el objeto _usuario  a un JSON
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
            window.location.href = '/docentes';
          }, 1800);
        })
    }
  })
}

const actualizar = async () => {
  let _nombre = document.getElementById('nombre').value
  let _apellido = document.getElementById('apellido').value
  let _correo = document.getElementById('correo').value
  let _celular = document.getElementById('celular').value
  let _estado = document.getElementById('estado').value
  const url = 'https://backacademiaapi.onrender.com/api/docente';

    let Docente = {
      nombre: _nombre,
      apellido: _apellido,
      correo: _correo,
      celular:_celular,
      estado: _estado
    }
    if ((_nombre !== '') && (_apellido !== '') && (_correo) && (_celular) && (_estado !== '') ){
    try {
      // Enviar una solicitud POST al servidor
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(Docente),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        // Mostrar mensaje de éxito
        Swal.fire(data.msg, 'El docente se actualizo correctamente!', 'success');

        setTimeout(() => {
          window.location.href = '/docentes';
        }, 2800);
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
};

document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('btnCrearDocente');
    button.addEventListener('click', function() {
      window.location.href = "/crearDocente";
    });
  });

  if (document.querySelector('#btnGuardar')) {
    document.querySelector('#btnGuardar')
      .addEventListener("click", () => { actualizar() })
  }