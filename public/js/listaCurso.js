const url = 'https://backacademiaapi.onrender.com/api/curso'
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
      let listaCursos = data.cursos //Capturar el array devuelto por la api
      datos =
        listaCursos.map(function (curso) {//Recorrer el array
          respuesta += `<tr><td>${curso.nombre}</td>` +
            `<td>${curso.docente}</td>` +
            `<td>${curso.grupo}</td>` +
            `<td>${curso.nivel}</td>` +
            `<td>${curso.cupo}</td>` +
            `<td>${curso.fechaI}</td>` +
            `<td>${curso.fechaF}</td>` +
            `<td>${curso.estado}</td>` +
            `<td><a class="btn btn-info" href="#modal1" onclick='editar(${JSON.stringify(curso)})' >Editar</a> 
            <a class="btn btn-danger" onclick='eliminar(${JSON.stringify(curso)})'>Eliminar</a></td>` +
            `</tr>`
          body.innerHTML = respuesta
        })
    })
}

const eliminar = (nombre) =>{
  const url = 'https://backacademiaapi.onrender.com/api/curso';

  if(confirm('¿esta seguro que desea realizar la eliminacion ')== true){
  
      let curso = {
          nombre: nombre.nombre
        }
      fetch(url,  {
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(curso),//Convertir el objeto _usuario  a un JSON
          headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(json => {
          alert(json.msg)//Mensaje que retorna la API
          
      })
  }
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('btnCrearCurso');
    button.addEventListener('click', function() {
      window.location.href = "/crearCursos";
    });
  });