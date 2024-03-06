document.addEventListener("DOMContentLoaded", function() {
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
  
    function mostrarArticulos(data) {
      var articulos = JSON.parse(data).articulos;
      var articulosLista = document.getElementById("articulos-lista");
  
      articulos.forEach(function(articulo) {
        var articuloHTML = `
          <a href="detalleArticulo.html?id=${articulo.id}">
            <div>
              <img src="${articulo.imagen}" alt="Imagen de ${articulo.nombre}">
              <p class="nombre">${articulo.nombre}</p>
              <p class="descripcion">${articulo.descripcion}</p>
              <p class="precio">$${articulo.precio}</p>
              <p class="disponible">${articulo.disponible ? 'Disponible' : 'No disponible'}</p>
            </div>
          </a>
        `;
        articulosLista.innerHTML += articuloHTML;
      });
    }
  
    cargarJSON('../json/datos3.json', mostrarArticulos);
  });
  