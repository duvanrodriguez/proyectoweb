<template>
    <main >
        
        <h2>CONTACTO</h2>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">
        <!-- Usa v-bind o : para enlazar dinámicamente el atributo alt -->
        <img :src="usuario.imagen" :alt="'Imagen de ' + usuario.nombre">
        <p>Nombre: {{ usuario.nombre }} {{ usuario.apellido }}</p>
        <p>Edad: {{ usuario.edad }}</p>
        <p>Dirección: {{ usuario.direccion }}</p>
        <p>Celular: {{ usuario.celular }}</p>
        <p>Universidad: {{ usuario.universidad }}</p>
        <p>Carrera: {{ usuario.carrera }}</p>
        <!-- Usar v-if o v-show para mostrar condicionalmente el estado del usuario -->
        <p v-if="usuario.activo">Activo</p>
        <p v-else>Inactivo</p>
      </li>
    </ul>
    </main>
</template>

<script>
import usuariosJSON from '../json/datos1.json';

export default {
  data() {
    return {
      usuarios: []
    };
  },
  created() {
    // Asignar los datos de usuarios del archivo JSON al objeto usuarios
    this.usuarios = usuariosJSON.usuarios;
  }
};
</script>