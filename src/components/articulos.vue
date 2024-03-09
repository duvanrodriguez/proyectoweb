<template>
        <main>
          <div>
            <h1>Lista de Artículos de Tecnología</h1>
            <ul>
              <li v-for="articulo in articulos" :key="articulo.id">
                <img :src="articulo.imagen" :alt="'Imagen de ' + articulo.nombre">
                <p>Nombre: {{ articulo.nombre }}</p>
                <p>Descripción: {{ articulo.descripcion }}</p>
                <p>Precio: ${{ articulo.precio }}</p>
                <p v-if="articulo.disponible">Disponible</p>
                <p v-else>No disponible</p>
              </li>
            </ul>
          </div>
        </main>
</template>
<script>

import articulosJSON from '../json/datos3.json';

export default {
  data() {
    return {
      // array datos del archivo JSON
      articulos: []
    };
  },
  created() {
    // datos de los artículos del archivo JSON al objeto articulos
    this.articulos = articulosJSON.articulos;
  }
};
</script>