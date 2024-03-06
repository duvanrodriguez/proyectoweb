document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar el JSON
    function cargarJSON(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.overrideMimeType("Pro_web/json");
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    }
  
    // Función para mostrar la lista de usuarios
    function mostrarUsuarios(data) {
      var usuarios = JSON.parse(data).usuarios;
      var usuariosLista = document.getElementById("usuarios-lista");
  
      usuarios.forEach(function(usuario) {
        var usuarioHTML = `
          <div>
            <img src="${usuario.imagen}" alt="Foto de ${usuario.nombre} ${usuario.apellido}">
            <p>Nombre: ${usuario.nombre} ${usuario.apellido}</p>
            <p>Edad: ${usuario.edad}</p>
            <p>Dirección: ${usuario.direccion}</p>
            <p>Celular: ${usuario.celular}</p>
            <p>Universidad: ${usuario.universidad}</p>
            <p>Carrera: ${usuario.carrera}</p>
            <p>Activo: ${usuario.activo ? 'Sí' : 'No'}</p>
          </div>
        `;
        usuariosLista.innerHTML += usuarioHTML;
      });
    }
  
    // Llama a la función para cargar el JSON y mostrar los usuarios
    cargarJSON('../json/datos1.json', mostrarUsuarios);
  });