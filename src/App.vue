<template>
  <div>
    <nav class="menu">
      <router-link to="/">🏠 Inicio</router-link>
      <router-link to="/bloque1">Bloque 1</router-link>
      <router-link to="/bloque2">Bloque 2</router-link>
      <router-link to="/bloque3">Bloque 3</router-link>
      <router-link to="/fetch">Fetch</router-link>
      <router-link to="/axios">Axios</router-link>
    </nav>

    <!-- Aquí se mostrará la vista activa -->
    <router-view />
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #eef;
  font-weight: bold;
}
.menu a.router-link-active {
  color: #d22;
}
</style>
