<!-- src/views/NotFoundView.vue -->
<!-- Página 404. Se muestra cuando la URL no coincide con ninguna ruta -->

<template>
  <div class="no-encontrada">
    <h2>Página no encontrada (404)</h2>
    <p><router-link to="/">Volver al inicio</router-link></p>
  </div>
</template>

<style scoped>
.no-encontrada {
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  color: red;
}
</style>
