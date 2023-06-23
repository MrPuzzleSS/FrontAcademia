
const registrar = async (event) => {
  event.preventDefault();
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
    console.log(grupo)
    try {
      // Enviar una solicitud POST al servidor
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(grupo),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        const data = await response.json();
        // Mostrar mensaje de éxito
        Swal.fire(data.msg, 'El grupo se registro correctamente!', 'success');

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

    let nombre = _nombre.trim(); 
    let asignatura = _asignatura.trim();

  if (nombre === "") {
    // Muestra un mensaje de error si el campo está vacío
    document.getElementById("nombreGrupoMensaje").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el nombre obligatorio</div>';
  } else {
    document.getElementById("nombreGrupoMensaje").innerHTML = '';
  }

  if(asignatura ===""){
    document.getElementById("asignaturaMensaje").innerHTML = '<div class="alert alert-danger" role="alert">Ingrese el campo asignatura obligatorio</div>';
  }else{
    document.getElementById("asignaturaMensaje").innerHTML = '';
  }
}
}

// Asociar la función registrar al evento de clic del botón "Registrar"
if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener("click", registrar);
}
