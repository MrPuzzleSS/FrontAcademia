const url = 'https://backacademiaapi.onrender.com/api/estudiante'
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
      let listaEstudiantes = data.estudiantes //Capturar el array devuelto por la api
      datos =
        listaEstudiantes.map(function (estudiante) {//Recorrer el array
          respuesta += `<tr><td>${estudiante.nombre}</td>` +
            `<td>${estudiante.apellido}</td>` +
            `<td>${estudiante.correo}</td>` +
            `<td>${estudiante.celular}</td>` +
            `<td>${estudiante.estado}</td>` +
            `<td><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(estudiante)})' >Editar</a> 
            <a class="btn btn-danger" onclick='eliminar(${JSON.stringify(estudiante)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

const editar = (estudiante) => {
  document.getElementById('nombre').value = ''
  document.getElementById('apellido').value = ''
  document.getElementById('correo').value = ''
  document.getElementById('celular').value = ''
  document.getElementById('estado').value = ''

  document.getElementById('nombre').value = estudiante.nombre
  document.getElementById('apellido').value = estudiante.apellido
  document.getElementById('correo').value = estudiante.correo
  document.getElementById('celular').value = estudiante.celular
  document.getElementById('estado').value = estudiante.estado
}

const eliminar = (nombre) => {
  const url = 'https://backacademiaapi.onrender.com/api/estudiante';

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
      let estudiante = {
        nombre: nombre.nombre
      }

      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(estudiante),//Convertir el objeto _usuario  a un JSON
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
            window.location.href = '/estudiantes';
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
  const url = 'https://backacademiaapi.onrender.com/api/estudiante';

    let Estudiante = {
      nombre: _nombre,
      apellido: _apellido,
      correo: _correo,
      celular:_celular,
      estado: _estado
    }
    console.log(Estudiante)
    if ((_nombre !== '') && (_apellido !== '') && (_correo) && (_celular) && (_estado !== '') ){
    try {
      // Enviar una solicitud POST al servidor
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(Estudiante),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        // Mostrar mensaje de éxito
        Swal.fire(data.msg, 'El estudiante se actualizo correctamente!', 'success');

        setTimeout(() => {
          window.location.href = '/estudiantes';
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
    let button = document.getElementById('btnCrearEstudiante');
    button.addEventListener('click', function() {
      window.location.href = "/crearEstudiante";
    });
  });

  if (document.querySelector('#btnGuardar')) {
    document.querySelector('#btnGuardar')
      .addEventListener("click", () => { actualizar() })
  }