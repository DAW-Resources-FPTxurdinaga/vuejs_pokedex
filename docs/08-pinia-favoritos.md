# ❤️ 08. Estado global con Pinia: favoritos

En el apartado 03 los favoritos se guardaban dentro del componente. Ahora los pasamos a un **store de Pinia**, para que cualquier componente pueda leerlos y modificarlos sin pasarlos por props.

📄 **Archivos de este apartado:**

* `src/stores/pokemon.js` → store con los favoritos.
* `src/views/PokedexBloque7Pinia.vue` → vista que usa el store.

🌐 **Ruta en la app:** `/pinia-fav`

---

## 🎯 Objetivos del apartado

* Guardar en un store una lista de IDs de favoritos.
* Crear **getters** (valores calculados) con `computed`.
* Crear **acciones** que modifican el estado.
* Usar el store desde un componente con `usePokemonStore()`.

---

## 🔄 Comparación con el apartado 03

| | Apartado 03 (estado local) | Apartado 08 (store Pinia) |
|---|---|---|
| Dónde se guardan los favoritos | En la propiedad `favorito` de cada pokémon | En una lista de IDs dentro del store |
| Quién puede modificarlos | Solo el componente que los define | Cualquier componente que use el store |
| Cómo se llega a ellos | Dentro del mismo `<script setup>` | `usePokemonStore()` desde cualquier archivo |

Ninguno de los dos enfoques es «mejor» en todos los casos. Si el dato solo lo usa un componente, el estado local basta. Si lo usan varios, conviene un store.

---

# 📌 1. Crear el store: `src/stores/pokemon.js`

El store guarda los IDs favoritos y ofrece funciones para cambiarlos:

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
  // Estado: lista de IDs de los pokémon favoritos
  const favoritos = ref([])

  // Getter: valor calculado a partir del estado
  const totalFavoritos = computed(() => favoritos.value.length)

  // Acciones: funciones que modifican el estado
  const agregarFavorito = (pokemonId) => {
    if (!favoritos.value.includes(pokemonId)) {
      favoritos.value.push(pokemonId)
    }
  }

  const eliminarFavorito = (pokemonId) => {
    favoritos.value = favoritos.value.filter(id => id !== pokemonId)
  }

  const alternarFavorito = (pokemonId) => {
    if (favoritos.value.includes(pokemonId)) {
      eliminarFavorito(pokemonId)
    } else {
      agregarFavorito(pokemonId)
    }
  }

  const esFavorito = (pokemonId) => {
    return favoritos.value.includes(pokemonId)
  }

  return {
    favoritos,
    totalFavoritos,
    agregarFavorito,
    eliminarFavorito,
    alternarFavorito,
    esFavorito
  }
})
```

**Ideas clave:**

* **Estado:** `favoritos`. Es la única fuente de verdad.
* **Getter:** `totalFavoritos` se calcula solo a partir de `favoritos`. No se guarda por separado, así nunca queda desincronizado.
* **Acciones:** funciones que cambian el estado. Los componentes las llaman en lugar de tocar `favoritos` directamente.
* `eliminarFavorito` usa `filter` y reasigna el array. Para `push` no hace falta reasignar.

---

# 📌 2. Usar el store en la vista: `PokedexBloque7Pinia.vue`

La vista llama a `usePokemonStore()` y usa sus getters y acciones directamente en el template:

```vue
<script setup>
import { ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon'

// Accedemos directamente al store
const pokemonStore = usePokemonStore()

// Lista simple de pokémon (los datos no están en el store)
const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', imagen: '/img/bulbasaur.png' },
  { id: 4, nombre: 'charmander', imagen: '/img/charmander.png' },
  { id: 7, nombre: 'squirtle', imagen: '/img/squirtle.png' },
  { id: 25, nombre: 'pikachu', imagen: '/img/pikachu.png' }
])
</script>

<template>
  <div class="app">
    <h1>08 · Favoritos con Pinia</h1>

    <div class="pinia-info">
      <p><strong>Total Favoritos:</strong> {{ pokemonStore.totalFavoritos }}</p>
      <p><strong>Lista de IDs:</strong> {{ pokemonStore.favoritos }}</p>
    </div>

    <ul class="pokemon-grid">
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.imagen" :alt="pokemon.nombre" />
        <h3>{{ pokemon.nombre }}</h3>

        <button
          @click="pokemonStore.alternarFavorito(pokemon.id)"
          :class="{ 'es-fav': pokemonStore.esFavorito(pokemon.id) }"
        >
          {{ pokemonStore.esFavorito(pokemon.id) ? '❤️' : '🤍' }}
        </button>
      </li>
    </ul>
  </div>
</template>
```

**Ideas clave:**

* `pokemonStore.totalFavoritos` es un getter: en el template se usa igual que una propiedad, sin paréntesis.
* `pokemonStore.alternarFavorito(pokemon.id)` es una acción: se llama como una función.
* Los datos de los pokémon siguen siendo locales. Solo los favoritos son globales: el store guarda **qué** pokémon son favoritos, no **cuáles** son.

---

# 🎨 Estilos

```vue
<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  text-align: center;
}

.pinia-info {
  background: #f0f8ff;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  border: 1px solid #daeafa;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 0;
  list-style: none;
}

.pokemon-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pokemon-card img {
  width: 100px;
  height: 100px;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button.es-fav {
  background-color: #ffe6e6;
  border-color: #ffcccc;
  color: #d00;
  font-weight: bold;
}
</style>
```

---

# 📝 Ejercicios

1. Muestra en la vista el **nombre** de cada pokémon favorito, no solo su ID (pista: filtra `pokemons` con `pokemonStore.esFavorito(p.id)`).
2. Añade un botón **«Quitar todos»** que vacíe los favoritos. Crea una acción nueva en el store para ello.
3. El store tiene las acciones `agregarFavorito` y `eliminarFavorito`. Usa solo esas dos en el botón en lugar de `alternarFavorito` y explica la diferencia.
4. Observa que el store **no** tiene una lista de pokémon. ¿Qué pasaría si quisieras mostrar los favoritos en otra vista (por ejemplo, `/pokemon/25`)? Comprueba que el estado se comparte entre vistas.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[07 — Estado global con Pinia: login](./07-pinia-login.md)

⏭️ **Siguiente apartado**
[09 — Rutas dinámicas y vista de detalle](./09-rutas-y-detalle.md)
