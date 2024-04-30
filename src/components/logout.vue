<template>
    <nav>
      <!-- Otros elementos de la barra de navegación -->
  
      <!-- Botón de Cerrar sesión -->
      <button @click="logout">Cerrar sesión</button>
    </nav>
  </template>
  
  <script>
  import axios from '../axios';
  import router from '../routes';
  
  export default {
    methods: {
      async logout() {
        try {
          // Realizar una solicitud al backend para el logout (si es necesario)
          await axios.post('/logout');
  
          // Eliminar el token del localStorage
          localStorage.removeItem('token');
  
          // Redirigir a la página de inicio de sesión u otra página deseada
          router.push('/login');
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          // Manejar errores
        }
      }
    }
  };
  </script>
  