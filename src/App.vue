<!-- src/App.vue -->
<!-- Componente raíz: cabecera con el menú de bloques y la vista activa del router -->

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="header-content">
        <h1>Pokedex con Vue</h1>

        <!-- Solo se muestra si hay un usuario logueado (login del paso 07 · Pinia) -->
        <div v-if="authStore.isAuthenticated" class="user-info">
          <span>Usuario: <strong>{{ authStore.username }}</strong></span>
          <button @click="authStore.logout()" class="btn-logout">Salir</button>
        </div>
      </div>

      <!-- Menú generado con router-link: cada bloque tiene su propia URL -->
      <nav class="menu">
        <router-link
          v-for="enlace in enlaces"
          :key="enlace.ruta"
          :to="enlace.ruta"
        >
          {{ enlace.texto }}
        </router-link>
      </nav>
    </header>

    <main class="contenido">
      <!-- Aquí se muestra la vista de la ruta activa -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

// Enlaces del menú. Cada uno apunta a una ruta definida en src/router/index.js
const enlaces = [
  { ruta: '/', texto: '🏠 Inicio' },
  { ruta: '/bloque1', texto: '01 · Conceptos básicos' },
  { ruta: '/bloque2', texto: '02-03 · Filtros y eventos' },
  { ruta: '/bloque3', texto: '04 · Componentes' },
  { ruta: '/fetch', texto: '05 · Fetch' },
  { ruta: '/axios', texto: '06 · Axios' },
  { ruta: '/pinia', texto: '07 · Pinia (login)' },
  { ruta: '/pinia-fav', texto: '08 · Pinia (favoritos)' },
  { ruta: '/pokemon/25', texto: '09 · Rutas y detalle' }
]
</script>

<style scoped>
.app-shell {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  font-family: system-ui, sans-serif;
}

.topbar {
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topbar h1 {
  margin: 0;
  font-size: 1.4rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.btn-logout {
  padding: 0.3rem 0.6rem;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-logout:hover {
  background-color: #ddd;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.menu a {
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0.4rem 0.7rem;
  background: #f8f8f8;
  color: #333;
  text-decoration: none;
  font-size: 0.85rem;
}

.menu a.router-link-active {
  background: #e3350d;
  color: white;
  border-color: #e3350d;
}

.contenido {
  margin-top: 1rem;
}
</style>
