<template>
    <div>
        <p>
            esto es una prueba
        </p>
        <main id="mainPage3">
            <div id="articulos-lista"></div>
        </main>
</div>
</template>
<script>
import '../js/scriptArticulo';
export default {
  name: 'Articulos',
  props: {
    msg: String
  }
}
</script>