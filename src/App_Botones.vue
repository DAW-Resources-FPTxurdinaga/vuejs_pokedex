<!-- src/App.vue -->
<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="header-content">
        <h1>Pokedex con VueJS · Ejemplos</h1>
        
        <div v-if="authStore.isAuthenticated" class="user-info">
          <span>Usuario: <strong>{{ authStore.username }}</strong></span>
          <button @click="authStore.logout()" class="btn-logout">Salir</button>
        </div>
      </div>

      <div class="selector">
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'bloque1' }"
          @click="ejemploSeleccionado = 'bloque1'"
        >
          Bloque 1: lista básica
        </button>

        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'bloque2' }"
          @click="ejemploSeleccionado = 'bloque2'"
        >
          Bloque 2: filtros y favoritos
        </button>
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'bloque3' }"
          @click="ejemploSeleccionado = 'bloque3'"
        >
          Bloque 3: detalles y rutas dinámicas
        </button>
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'fetch' }"
          @click="ejemploSeleccionado = 'fetch'"
        >
          Bloque 4: Fetch API
        </button>
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'axios' }"
          @click="ejemploSeleccionado = 'axios'"
        >
          Bloque 5: Axios
        </button>
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'pinia' }"
          @click="ejemploSeleccionado = 'pinia'"
        >
          Bloque 6: Pinia
        </button>
        <button
          type="button"
          :class="{ activo: ejemploSeleccionado === 'piniafav' }"
          @click="ejemploSeleccionado = 'piniafav'"
        >
          Bloque 7: Pinia Favs
        </button>
      </div>
    </header>

    <main class="contenido">
      <!-- Componente dinámico -->
      <component :is="componenteActual" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from './stores/auth'

import PokedexBloque1 from './views/PokedexBloque1.vue'
import PokedexBloque2 from './views/PokedexBloque2.vue'
import PokedexBloque3 from './views/PokedexBloque3.vue'
import PokedexFetch from './views/PokedexBloque4Fetch.vue'
import PokedexAxios from './views/PokedexBloque5Axios.vue'
import PokedexPinia from './views/PokedexBloque6Pinia.vue'
import PokedexBloque7Pinia from './views/PokedexBloque7Pinia.vue'

const authStore = useAuthStore()
const ejemploSeleccionado = ref('bloque1')

const componentes = {
  bloque1: PokedexBloque1,
  bloque2: PokedexBloque2,
  bloque3: PokedexBloque3,
  fetch: PokedexFetch,
  axios: PokedexAxios,
  pinia: PokedexPinia,
  piniafav: PokedexBloque7Pinia
}

const componenteActual = computed(() =>
  componentes[ejemploSeleccionado.value]
)
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

.selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selector button {
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0.4rem 0.7rem;
  background: #f8f8f8;
  cursor: pointer;
  font-size: 0.85rem;
}

.selector button.activo {
  background: #e3350d;
  color: white;
  border-color: #e3350d;
}

.contenido {
  margin-top: 1rem;
}
</style>
