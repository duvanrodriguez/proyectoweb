<template>
    <div>
      <footer class="footer">
        <p>Desarrollado por Duvan Rodriguez</p>
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
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}
</style>