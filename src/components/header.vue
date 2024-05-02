<template>
    <header class="header">
      <div class="logo">
        <img alt="Vue logo" src="../img/Dartech Digital.jpeg">
      </div>
      <h1>Tu puente hacia el futuro digital</h1>
      <nav class="center-nav">
        <ul>
          <li>
            <router-link to="/" class="link">Inicio</router-link>
          </li>
          <li>
            <router-link to="/articulos" class="link">Artículos</router-link>
          </li>
          <li>
            <router-link to="/usuarios" class="link">Contacto</router-link>
          </li>
          <li>
            <router-link to="/perfil" class="link">usuarios</router-link>
          </li>
          <!-- Mostrar el botón de cierre de sesión y el nombre del usuario si está autenticado -->
          <li v-if="isAuthenticated" class="dropdown">
            <a href="#" class="link dropbtn">Bienvenido, {{ user.firstName }}</a>
            <div class="dropdown-content">
              <button @click="logout">Cerrar sesión</button>
            </div>
          </li>
          <!-- Mostrar el botón de inicio de sesión si el usuario no está autenticado -->
          <li v-else>
            <router-link to="/login" class="link">Iniciar Sesión</router-link>
          </li>
          <li>
            <router-link to="/registro">Registrarse</router-link>
          </li>
          <!--
            <li class="dropdown">
            <a href="#" class="link dropbtn">Iniciar Sesión / Registrarse</a>
            <div class="dropdown-content">
              
              <router-link to="/login">Iniciar Sesión</router-link>
              <router-link to="/registro">Registrarse</router-link>
            </div>
          </li>
          -->
        </ul>
      </nav>
    </header>

</template>

<script>
import axios from '../axios';
import routes from '../routes';
import jwt_decode from "jsonwebtoken";

export default {
  data() {
    return {
      isAuthenticated: false, // Indica si el usuario está autenticado
      user: {} // Almacena los datos del usuario autenticado
    };
  },
  mounted() {
    // Verificar si el usuario está autenticado
    this.isAuthenticated = this.checkAuthentication();

    // Si el usuario está autenticado, obtener sus datos
    if (this.isAuthenticated) {
      this.user = this.getUserData();
    }
  },
  methods: {
    // Verificar si el usuario está autenticado (por ejemplo, revisando el token)
    checkAuthentication() {
      const token = localStorage.getItem('token');
      return !!token; // Devuelve true si hay un token, false si no
    },
    // Obtener los datos del usuario desde el token (por ejemplo, decodificando el token)
    getUserData() {
      const token = localStorage.getItem('token');
      // Decodificar el token y obtener los datos del usuario (nombre, apellido, etc.)
      // Aquí puedes usar la biblioteca jwt-decode o tu propio método para decodificar el token
      const userData = jwt_decode(token);
      // Supongamos que el token contiene los datos del usuario en forma de objeto
      return userData;
    },
    // Método para cerrar sesión
    async logout() {
      try {
        // Realizar una solicitud al backend para cerrar sesión
        await axios.post('/logout');
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir a la página de inicio de sesión u otra página deseada
        routes.push('/login');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al cerrar sesión:', error);
        // Manejar errores
      }
    }
  }
};
</script>

  
<style>
.header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}

.logo {
  background-color: #333;
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav li {
  float: left;
  margin-right: 20px;
  border-right: 1px solid white; /* Agrega borde derecho */
}

nav li:last-child {
  border-right: none; /* Elimina el borde derecho del último elemento */
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.link {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.link.dropdown .dropbtn {
  border-right: 1px solid white;
  padding-right: 10px;
}

/* Estilos para el menú desplegable */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.center-nav {
  display: flex;
  justify-content: center;
}

  </style>
  