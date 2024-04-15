<template>
    <main>
        <div class="registro-usuario">
      <h1>Formulario de Registro de Usuario</h1>
      <form class="formulario" @submit.prevent="registrarUsuario">
        <div class="campo">
        <label for="nombres">Nombres:</label><br>
        <input type="text" id="nombres" v-model="usuarios.nombres" required><br>
        
        <label for="apellidos">Apellidos:</label><br>
        <input type="text" id="apellidos" v-model="usuarios.apellidos" required><br>
  
        <label for="Cedula">Cedula:</label><br>
        <input type="text" id="cedula" v-model="usuarios.cedula" required><br>

        <label for="Correo">Correo:</label><br>
        <input type="text" id="email" v-model="usuarios.email" required><br>

        <label for="Constraseña">Contraseña:</label><br>
        <input type="text" id="password" v-model="usuarios.password" required><br>

        <label for="Direccion">Direccion:</label><br>
        <input type="text" id="direccion" v-model="usuarios.direccion" required><br>

        <label for="Cieuda">Ciudad:</label><br>
        <input type="text" id="ciudad" v-model="usuarios.ciudad" required><br>

        <label for="Rol">Rol:</label><br>
        <input type="text" id="rol" v-model="usuarios.rol" required><br>

        <label for="Estado">Estado:</label><br>
        <input type="text" id="estado" v-model="usuarios.estado" required><br>
    </div>
        <div class="botones">
        <button type="submit" class="boton-registrar">Registrarse</button>
      </div>

      </form>
      <br>
      <br>
    </div>
    </main>
  </template>
  
  <script>
  import axios from '../axios';

  export default {
    data() {
      return {
        usuarios: {
          nombres: '',
          apellidos: '',
          cedula: '',
          email: '',
          passwoed: '',
          direccion: '',
          ciudad: '',
          rol: '',
          estado: ''

        }
      };
    },
    methods: {
    async registrarUsuario() {
      try { 
        // Realizar POST al backend utilizando Axios
        const response = await axios.post('/registro', this.usuarios);

        // respuesta del backend
        // eslint-disable-next-line no-console
        console.log('Usuario registrado con éxito:', response.data);
      } catch (error) {
        // Manejar errores de la solicitud
        // eslint-disable-next-line no-console
        console.error('Error al registrar usuario:', error);
      }
    }
  }
};
  </script>
  

  <style scoped>
.registro-usuario {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.formulario {
  width: 300px;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.campo {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

.boton-registrar {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton-registrar:hover {
  background-color: #0056b3;
}
</style>