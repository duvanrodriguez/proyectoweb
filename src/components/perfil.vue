<template>
  <main>
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cedula</th>
            <th>correo</th>
            <th>contraseña</th>
            <th>Direccion</th>
            <th>Ciudad</th>
            <th>rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombres }}</td>
            <td>{{ usuario.apellidos }}</td>
            <td>{{ usuario.cedula }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.password }}</td>
            <td>{{ usuario.direccion }}</td>
            <td>{{ usuario.ciudad }}</td>
            <td>{{ usuario.rol }}</td>
            <td>{{ usuario.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
  </template>
  
  <script>
  import axios from '../axios'; 
  
  export default {
    data() {
      return {
        usuarios: []
      };
    },
    mounted() {
      // Realizar GET al backend para obtener los datos de los usuarios
      axios.get('/listaUsuarios')
        .then(response => {
          // Asignar los datos de los usuarios recibidos del backend al array usuarios
          this.usuarios = response.data;
        })
        .catch(error => {
          // Manejar errores de la solicitud
          console.error('Error al obtener usuarios:', error);
        });
    }
  };
  </script>