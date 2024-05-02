<template>
    <main>
    <div class="login">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="iniciarSesion" class="formulario">
        <div class="campo">
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="campo">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="botones">
          <button type="submit" class="boton-iniciar">Iniciar Sesión</button>
        </div>
      </form>
      <!-- Alerta de éxito -->
      <div v-if="inicioExitoso" class="alert alert-success" role="alert">
          {{ mensajeInicio }}
        </div>

    </div>
</main>
</template>
  
<script>
import axios from '../axios';
import router from '../routes';
import jwt_decode from "jsonwebtoken";

export default {
  data() {
    return {
        email: '',
        password: '',
        inicioExitoso: false,
        mensajeInicio: ''
    };
  },
  methods: {
    async iniciarSesion() {
      // eslint-disable-next-line no-console
      console.log('inciando metodo sesion....');
      try {
        // eslint-disable-next-line no-console
        console.log('Datos enviados al backend:', this.usuarios);

        const response = await axios.post('/login', {
          email: this.email,
          password: this.password
        });

        const token = response.data.token;
        localStorage.setItem('token', token); // Almacenar el token en el localStorage

        // Decodificar el token para obtener los datos del usuario
        const userData = jwt_decode(token);

        // Aquí userData contendrá los datos del usuario que estaban codificados en el 
        // eslint-disable-next-line no-console
        console.log(userData);

        if (response.status === 200) {
          // Reiniciar los campos del formulario
          this.inicioExitoso = true;
          this.mensajeInicio = '¡has iniciado sesion exitosamente!';
          // Después de 4 segundos, ocultar la alerta
            setTimeout(() => {
              this.inicioExitoso = true;
              this.mensajeInicio = '';
            }, 4000);
          setTimeout(() => {
            router.push('/');
          }, 4000);
        } else {
          this.inicioExitoso = false;
          this.mensajeInicio = '¡Credenciales inválidas!';
          this.error = 'Credenciales inválidas';
          setTimeout(() => {
            this.registroExitoso = false;
          }, 4000);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al iniciar sesión:', error);
        this.error = 'Error interno del servidor';
        setTimeout(() => {
          this.inicioExitoso = false;
          this.mensajeInicio = '';
        }, 4000);
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

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 68px;
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
  
  .boton-iniciar {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .boton-iniciar:hover {
    background-color: #0056b3;
  }
  </style>
  