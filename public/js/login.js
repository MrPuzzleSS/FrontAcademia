const validarLogin = async () => {

  let usuario = document.getElementById("usuario");
  let password = document.getElementById("password");

  let emailMensaje = document.getElementById("emailMensaje");
  let passwordMensaje = document.getElementById("passwordMensaje");

  let valido = true;

  // Validar campo de correo o usuario
  if (usuario.value.trim() === "") {
    emailMensaje.textContent = "Ingrese su usuario";
    valido = false;
  } else {
    emailMensaje.textContent = "";
  }

  // Validar campo de contraseña
  if (password.value.trim() === "") {
    passwordMensaje.textContent = "Ingrese su contraseña";
    valido = false;
  } else {
    passwordMensaje.textContent = "";
  }

  if(valido == true){
    // Obtener los datos del formulario
const nombre = document.getElementById('usuario').value;
const password = document.getElementById('password').value;
const url = 'https://backacademiaapi.onrender.com/api/auth/login';
// Crear un objeto con los datos del usuario
const usuario = {
  nombre: nombre,
  password: password
};

// Realizar la petición a la API
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(usuario)
})
.then(response => response.json())
.then(data => {
  
  console.log(data)
})
.catch(error => {
  // Manejar cualquier error en la petición
  console.error('Error:', error);
});
}
}


if (document.querySelector('#btnIniciarSesion')) {
  document.querySelector('#btnIniciarSesion').addEventListener("click", validarLogin);
}


