<template>
  <div>
    <h1>Personajes de Rick and Morty</h1>
    <div class="personajes-container">
      <div class="personaje-card" v-for="personaje in personajes" :key="personaje.id">
        <img :src="personaje.image" :alt="personaje.name">
        <div class="personaje-info">
          <h3>{{ personaje.name }}</h3>
          <p>Status: {{ personaje.status }}</p>
          <p>Especie: {{ personaje.species }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      personajes: []
    };
  },
  mounted() {
    this.fetchPersonajes();
  },
  methods: {
    fetchPersonajes() {
      axios.get('https://rickandmortyapi.com/api/character')
        .then(response => {
          this.personajes = response.data.results;
        })
        .catch(error => {
          console.error('Error al obtener los personajes:', error);
        });
    }
  }
}
</script>

<style>
.personajes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.personaje-card {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

.personaje-card img {
  width: 100%;
  border-radius: 4px;
}

.personaje-info {
  margin-top: 10px;
}

.personaje-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.personaje-info p {
  font-size: 14px;
  margin-bottom: 3px;
}


@media screen and (max-width: 768px) {
  .personajes-container {
    justify-content: center; /* Centrar las tarjetas */
  }

  .personaje-card {
    width: calc(50% - 20px); /* Ancho del 50% de la ventana gráfica, menos el espacio entre tarjetas */
  }
}
</style>