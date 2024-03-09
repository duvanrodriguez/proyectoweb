<template>
    <div>
        <footer>
            <p>pagina desarrollada por Duvan Rodriguguez</p>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<style>
footer {
    background-color: #333;
    color: white;
    padding: 10px;
}
</style>