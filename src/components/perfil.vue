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
          <tr v-for="usuario in usuarios" :key="usuario.idusuarios">
            <td>{{ usuario.idusuarios }}</td>
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
          // eslint-disable-next-line no-console
          console.log('Respuesta del servidor:', response);
      

          // Asignar los datos de los usuarios recibidos del backend al array usuarios
          // eslint-disable-next-line no-console
          this.usuarios = response.data;

          // Imprimir los datos recibidos en la consola
          // eslint-disable-next-line no-console
      console.log('Datos recibidos del backend:', this.usuarios);
        })
        .catch(error => {
          // Manejar errores de la solicitud
          // eslint-disable-next-line no-console
          console.error('Error al obtener usuarios:', error);
        });
    }
  };
  </script>