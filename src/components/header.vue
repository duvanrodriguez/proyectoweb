<template>
    <id>
        <header>
        <h1>Tu puente hacia el futuro digital</h1>
        <nav>
          <router-link to="/">Inicio</router-link>
          <router-link to="/articulos">Artículos</router-link>
          <router-link to="/usuarios">Contacto</router-link>
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