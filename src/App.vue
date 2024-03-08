<template>
  <div id="app">
    <img alt="Vue logo" src="./img/Dartech Digital.jpeg">
    <HelloWorld msg="Tu puente hacia el futuro digital"/>
    <Header />

    <Main />

    <Footer />
  </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Main from './components/Main.vue'
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
