<template>
    <h1>{{ msg }}</h1>
    <header>
        <nav>
            <ul>
                <li><a href="index.html">inicio</a></li>
                <li><a href="usuarios.html" >Contacto</a></li>
                <li><a href="articulos.html" >Articulos</a></li>
            </ul>
        </nav>
        
    </header>

    <main id="mainPage3">
        <div id="articulos-lista"></div>
    </main>

    <footer>
    <p>pagina desarrollada por Duvan Rodriguguez</p>
</footer>


</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
