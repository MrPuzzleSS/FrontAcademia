
const registrar = async (event) => {
  event.preventDefault();
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
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(Estudiante),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        // Mostrar mensaje de éxito
        Swal.fire(data.msg, 'El estudiante se registro correctamente!', 'success');

        setTimeout(() => {
          window.location.href = '/estudiantes';
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

    let nombre = _nombre.trim(); 
    let apellido = _apellido.trim();
    let correo = _correo.trim();
    let celular = _celular.trim();

  if (nombre === "") {
    // Muestra un mensaje de error si el campo está vacío
    document.getElementById("mensajeNombre").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el nombre obligatorio</div>';
  } else {
    document.getElementById("mensajeNombre").innerHTML = '';
  }

  if(apellido ===""){
    document.getElementById("mensajeApellido").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el campo apellido obligatorio</div>';
  }else{
    document.getElementById("mensajeApellido").innerHTML = '';
  }

  if(correo ===""){
    document.getElementById("mensajeCorreo").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el campo correo obligatorio</div>';
  }else{
    document.getElementById("mensajeApellido").innerHTML = '';
  }

  if(celular ===""){
    document.getElementById("mensajeCelular").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el campo celular obligatorio</div>';
  }else{
    document.getElementById("mensajeCelular").innerHTML = '';
  }
  }
};

// Asociar la función registrar al evento de clic del botón "Registrar"
if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener("click", registrar);
}
