<template>
  <main>
    <h1>Lista de Artículos de Tecnología</h1>
    <div id="articulos-lista">
      <div v-for="articulo in articulos" :key="articulo.id">
        <a>
          <div class="articulo-card">
            <img :src="articulo.imagen" :alt="'Imagen de ' + articulo.nombre">
            <div class="articulo-info">
              <p class="nombre">{{ articulo.nombre }}</p>
              <p class="descripcion">{{ articulo.descripcion }}</p>
              <p class="precio">{{ articulo.precio | formatoMoneda }}</p>
              <p v-if="articulo.disponible" class="disponible">Disponible</p>
              <p v-else class="no-disponible">No disponible</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script>
import articulosJSON from '../json/datos3.json';


export default {
  data() {
    return {
      articulos: []
    };
  },
  created() {
    this.articulos = articulosJSON.articulos;
  },
  filters: {
    formatoMoneda(valor) {
      return `$${valor.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
/* Estilos para la lista de artículos de tecnología como tarjetas */
#articulos-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.articulo-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden; /* Oculta cualquier desbordamiento */
}

.articulo-card img {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.articulo-info {
  padding: 15px;
}

.articulo-info p {
  margin: 5px 0;
}

.articulo-info .nombre {
  font-weight: bold;
}

.articulo-info .precio {
  font-weight: bold;
  color: #007bff;
}

.articulo-info .disponible {
  color: #28a745;
}

.articulo-info .no-disponible {
  color: #dc3545;
}
</style>
