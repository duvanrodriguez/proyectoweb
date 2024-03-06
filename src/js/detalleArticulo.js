document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del artículo de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var articuloId = urlParams.get('id');
  
    // Lógica para cargar y mostrar el detalle del artículo
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
  
    function mostrarDetalleArticulo(data) {
      var articulos = JSON.parse(data).articulos;
      var detalleArticulo = document.getElementById("detalle-articulo");
  
      // Buscar el artículo con el ID correspondiente
      var articulo = articulos.find(function(item) {
        return item.id == articuloId;
      });
  
      if (articulo) {
        // Construir el HTML del detalle del artículo
        var detalleHTML = `
          <div>
            <img src="${articulo.imagen}" alt="Imagen de ${articulo.nombre}">
            <p class="nombre">${articulo.nombre}</p>
            <p class="descripcion">${articulo.descripcion}</p>
            <p class="precio">$${articulo.precio}</p>
            <p class="disponible">${articulo.disponible ? 'Disponible' : 'No disponible'}</p>
          </div>
        `;
        detalleArticulo.innerHTML = detalleHTML;
      } else {
        detalleArticulo.innerHTML = "<p>Artículo no encontrado.</p>";
      }
    }
  
    cargarJSON('../json/datos3.json', mostrarDetalleArticulo);
  });
  