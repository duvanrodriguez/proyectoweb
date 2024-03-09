<template>
    <id>
        <div class="logo">
        <img alt="Vue logo" src="../img/Dartech Digital.jpeg">
        </div>
        <header>
        <h1>Tu puente hacia el futuro digital</h1>
        <nav>
          <ul>
          <router-link to="/" class="link">Inicio</router-link>
          <router-link to="/articulos" class="link">Artículos</router-link>
          <router-link to="/usuarios" class="link">Contacto</router-link>
        </ul>
        </nav>
        
    </header>
    </id>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style>
.logo{
    background-color: #333;
}
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

header {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
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
}

nav a {
    text-decoration: none;
    color: white;
    font-weight: bold;
}

main {
    padding: 20px;
}

.link {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  border-right: 1px solid white; /* Agrega borde derecho */
  padding-right: 10px; /* Ajusta el espacio a la derecha del borde */
}
</style>