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

          <!-- <label for="Rol">Rol:</label><br>-->
        <input type="text" id="rol" v-model="usuarios.rol" required hidden><br>

          <!-- <label for="Estado">Estado:</label><br>-->
        <input type="text" id="estado" v-model="usuarios.estado" required hidden><br>
    </div>
        <div class="botones">
        <button type="submit" class="boton-registrar">Registrarse</button>
      </div>
      </form>

     <!-- Alerta de éxito -->
        <div v-if="registroExitoso" class="alert alert-success" role="alert">
          {{ mensajeRegistro }}
        </div>

    </div>
    <br>
      <br>
      <br>
      <br>
    </main>
  </template>
  
  <script>
  import axios from '../axios';
  import router from '../routes';

  export default {
    data() {
      return {
        usuarios: {
          nombres: '',
          apellidos: '',
          cedula: '',
          email: '',
          password: '',
          direccion: '',
          ciudad: '',
          rol: 'ESTANDAR',
          estado: 'ACTIVO'

        },
        registroExitoso: false,
        mensajeRegistro: ''
      };
    },
    methods: {
      async registrarUsuario() {
      try { 
        // Log para mostrar los datos enviados al backend
        // eslint-disable-next-line no-console
        console.log('Datos enviados al backend:', this.usuarios);
        
        // Realizar POST al backend utilizando Axios
        const response = await axios.post('/registrarUsuario', this.usuarios);

        /// Verificar si la respuesta del backend es exitosa (estado 201)
        if (response.status === 201) {
          // Reiniciar los campos del formulario
          this.registroExitoso = true;
          this.mensajeRegistro = '¡Usuario registrado exitosamente!';
          // Después de 4 segundos, ocultar la alerta
            setTimeout(() => {
              this.registroExitoso = true;
              this.mensajeRegistro = '';
            }, 4000);
          this.usuarios = {
            nombres: '',
            apellidos: '',
            cedula: '',
            email: '',
            password: '',
            direccion: '',
            ciudad: '',
            rol: '',
            estado: ''
          };
          // Mostrar log de éxito
          // eslint-disable-next-line no-console
          console.log('Usuario registrado con éxito:', response.data);
          // Redirigir al usuario a la página de inicio después de 2 segundos
          setTimeout(() => {
            router.push('/');
          }, 4000);
        } else {
          // Error en el registro
          this.registroExitoso = false;
          this.mensajeRegistro = 'Error al registrar usuario';
        
          setTimeout(() => {
            this.registroExitoso = false;
          }, 4000);
          // Si la respuesta no es exitosa, mostrar un mensaje de error
          // eslint-disable-next-line no-console
          console.error('Error al registrar usuario. Estado:', response.status);
        }
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
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #28a745; /* Color de fondo verde para la alerta de éxito */
  color: #ffffff; /* Color de texto blanco */
  text-align: center;
  padding: 10px 0;
  z-index: 9999; /* Asegura que la alerta esté por encima de otros elementos */
}

.alert-success {
  background-color: #28a745; /* Color de fondo verde para la alerta de éxito */
}

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