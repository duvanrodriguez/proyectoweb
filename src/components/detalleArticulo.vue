<template>
    <main>
      <div class="detalle-articulo">
        <div class="imagen-container">
          <div class="imagenes">
            <img src="imagen1.jpg" alt="Imagen 1">
            <img src="imagen2.jpg" alt="Imagen 2">
            <img src="imagen3.jpg" alt="Imagen 3">
            <img src="imagen4.jpg" alt="Imagen 4">
            <img src="imagen5.jpg" alt="Imagen 5">
          </div>
        </div>
        <div class="info-articulo">
          <h2>{{ articulo.nombre }}</h2>
          <p>{{ articulo.descripcion }}</p>
          <p>Precio: ${{ articulo.precio }}</p>
          <p>Stock disponible: {{ articulo.stock }}</p>
          <button @click="comprarArticulo">Comprar</button>
        </div>
      </div>
    </main>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      articulo: []
    };
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`/detalleArticulo/${id}`)
      .then(response => {
        this.articulo = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error al obtener detalles del artículo:', error);
      });
  },
  methods: {
    comprarArticulo() {
      // Aquí puedes implementar la lógica para comprar el artículo
    }
  }
};
</script>

<style>
.detalle-articulo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.imagen-container {
  width: 300px;
  height: 300px;
  overflow-x: auto;
  border: 1px solid #ccc; /* Borde para el contenedor de imágenes */
}

.imagenes {
  display: flex;
}

.imagenes img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-right: 10px;
}

.info-articulo {
  max-width: 400px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>