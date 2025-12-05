<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!-- Buscador -->
    <input
      v-model="search"
      type="text"
      placeholder="buscar pokémon…"
      class="input-busqueda"
    />

    <!-- Filtro por tipo -->
    <select v-model="tipoSeleccionado" class="input-tipo">
      <option
        v-for="tipo in tiposDisponibles"
        :key="tipo"
        :value="tipo"
      >
        {{ tipo }}
      </option>
    </select>

    <!-- Contador de favoritos -->
    <p class="contador-favs">
      Favoritos: {{ totalFavoritos }}
    </p>

    <!-- Listado -->
    <ul class="pokemon-grid">
      <li
        v-for="pokemon in pokemonsFiltrados"
        :key="pokemon.id"
        :class="{ favorito: pokemon.favorito }"
      >
        <!-- Botón favorito -->
        <button
          class="fav-btn"
          @click="toggleFavorito(pokemon.id)"
        >
          {{ pokemon.favorito ? '★' : '☆' }}
        </button>

        <img :src="pokemon.imagen" :alt="pokemon.nombre" class="pokemon-image"/>
        <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
        <p>tipos: {{ pokemon.tipos.join(', ') }}</p>
      </li>
    </ul>
    <p v-if="pokemonsFiltrados.length === 0" class="sin-resultados">
  No hay pokémon que coincidan con los filtros.
</p>

<button @click="mostrarInfo = !mostrarInfo" class="info-btn">
  {{ mostrarInfo ? "Ocultar información de autoría" : "Mostrar información de autoría" }}
</button>

<p v-show="mostrarInfo" class="info-extra">
  Este proyecto ha sido desarrollado por Laura Folgado Galache.
</p>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* ESTADO BÁSICO */
const titulo = ref('Pokedex con VueJS')
const mostrarInfo = ref(false)

const pokemons = ref([
  {
    id: 1,
    nombre: 'bulbasaur',
    tipos: ['planta', 'veneno'],
    imagen: 'img/bulbasur.png',
    favorito: false
  },
  {
    id: 4,
    nombre: 'charmander',
    tipos: ['fuego'],
    imagen: 'img/charmander.png',
    favorito: false
  },
  {
    id: 7,
    nombre: 'squirtle',
    tipos: ['agua'],
    imagen: 'img/squirtle.png',
    favorito: false
  },
  {
    id: 25,
    nombre: 'pikachu',
    tipos: ['eléctrico'],
    imagen: 'img/pikachu.png',
    favorito: false
  }
])

/* BÚSQUEDA Y FILTRO */

const search = ref('')
const tipoSeleccionado = ref('todos')

/* Las propiedades computadas son valores que se actualizan automáticamente 
cuando cambian los datos de los que dependen. */
/* En este caso, tiposDisponibles y pokemonsFiltrados se recalculan
cada vez que cambia pokemons, search o tipoSeleccionado. */
const tiposDisponibles = computed(() => {
  const tipos = new Set()
  pokemons.value.forEach((p) => p.tipos.forEach((t) => tipos.add(t)))
  return ['todos', ...Array.from(tipos)]
})

const pokemonsFiltrados = computed(() => {
  return pokemons.value.filter((pokemon) => {
    const coincideNombre = pokemon.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const coincideTipo =
      tipoSeleccionado.value === 'todos' ||
      pokemon.tipos.includes(tipoSeleccionado.value)

    return coincideNombre && coincideTipo
  })
})


/* FAVORITOS: Eventos y clases */
const toggleFavorito = (id) => {
  const pokemon = pokemons.value.find((p) => p.id === id)
  if (pokemon) pokemon.favorito = !pokemon.favorito
}

const totalFavoritos = computed(() =>
  pokemons.value.filter((p) => p.favorito).length
)
</script>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}
.input-busqueda,
.input-tipo {
  padding: 0.5rem 0.75rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}
.favorito {
  border: 2px solid gold;
}
.fav-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.4rem;
}
.contador-favs {
  margin: 1rem 0;
  font-weight: bold;
}
.pokemon-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  display: block;
  margin: 0 auto 0.5rem;
}
</style>
