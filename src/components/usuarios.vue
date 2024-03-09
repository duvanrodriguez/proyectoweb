<template>
  <main>
    <h2>CONTACTO</h2>
    <div id="usuarios-lista">
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">
          <!-- Usa v-bind o : para enlazar dinámicamente el atributo alt -->
          <img :src="usuario.imagen" :alt="'Imagen de ' + usuario.nombre">
          <p class="nombre">Nombre: {{ usuario.nombre }} {{ usuario.apellido }}</p>
          <p class="informacion">Edad: {{ usuario.edad }}</p>
          <p class="informacion">Dirección: {{ usuario.direccion }}</p>
          <p class="informacion">Celular: {{ usuario.celular }}</p>
          <p class="informacion">Universidad: {{ usuario.universidad }}</p>
          <p class="informacion">Carrera: {{ usuario.carrera }}</p>
          <!-- Usar v-if o v-show para mostrar condicionalmente el estado del usuario -->
          <p class="informacion" v-if="usuario.activo">Activo</p>
          <p class="informacion" v-else>Inactivo</p>
        </li>
      </ul>
    </div>
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

<style scoped>
/* Estilos tipo "contacto" para la lista de usuarios */
#usuarios-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

#usuarios-lista img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

#usuarios-lista ul {
  list-style-type: none;
  padding: 0;
}

#usuarios-lista li {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#usuarios-lista p {
  margin: 5px 0;
  text-align: center;
}

/* Estilo para el nombre */
#usuarios-lista .nombre {
  font-weight: bold;
  font-size: 1.2em;
}

/* Estilo para el resto de la información */
#usuarios-lista .informacion {
  font-size: 0.9em;
}

</style>
