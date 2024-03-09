<template>
    <main >
      <p>prueba Inicio</p>
    </main>
</template>

<script setup>
import {   onBeforeMount, ref } from 'vue';
import axios from '@/axios'; 

const nombre = ref("Duvan Rodriguez")
const items = ref("");
  const valoresRick = async () => {
    try {
        const response = await axios.get('/character/');
        items.value = response.data.results;
        console.log(items.value);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
  }

onBeforeMount(()=>{
  valoresRick()
})


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
