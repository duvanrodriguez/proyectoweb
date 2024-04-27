<template>
      <main>
      <div class="user-list">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Rol</th>
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
      <br>
      <br>
      <br>
      <br>
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

<style>
.user-list {
  margin-top: 20px;
  margin-bottom: 20px; /* Espacio entre la tabla y el footer */
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #007bff;
  color: white;
}

thead th {
  padding: 12px 15px;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ddd;
}

tbody td {
  padding: 10px 15px;
}

th,
td {
  border-right: 1px solid #ddd;
}

th:last-child,
td:last-child {
  border-right: none;
}
</style>