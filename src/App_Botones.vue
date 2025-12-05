<!-- src/App.vue -->
<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>Pokedex con VueJS · Ejemplos</h1>

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

import PokedexBloque1 from './views/PokedexBloque1.vue'
import PokedexBloque2 from './views/PokedexBloque2.vue'

const ejemploSeleccionado = ref('bloque1')

const componentes = {
  bloque1: PokedexBloque1,
  bloque2: PokedexBloque2
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

.topbar h1 {
  margin: 0;
  font-size: 1.4rem;
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
