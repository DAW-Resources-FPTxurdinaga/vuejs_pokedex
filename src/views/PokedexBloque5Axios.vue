<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!--
      0) Botón para cargar pokémon desde la API usando Fetch.
      Usamos loading y error para mostrar estados de la petición.
    -->
    <button @click="cargarPokemons" class="btn-cargar" :disabled="loading">
      {{ loading ? "Cargando pokémon..." : "Cargar Pokémon (Fetch)" }}
    </button>

    <!-- Mensaje de error si ocurre un problema en la petición -->
    <p v-if="error" class="error">{{ error }}</p>

    <!--
        1) Input de búsqueda
      v-model enlaza el input con la variable 'search'.
      Cada vez que el usuario escribe, search cambia, lo que hace que
      'pokemonsFiltrados' se recalcule automáticamente.
    -->
    <input
      v-model="search"
      type="text"
      placeholder="buscar pokémon…"
      class="input-busqueda"
    />

    <!--
        2) Select con opciones dinámicas
      v-model enlaza el <select> con 'tipoSeleccionado'
      'tiposDisponibles' es una computed que genera dinámicamente
      todas las opciones detectadas en los pokémon.
    -->
    <select v-model="tipoSeleccionado" class="input-tipo">
      <option
        v-for="tipo in tiposDisponibles"
        :key="tipo"
        :value="tipo"
      >
        {{ tipo }}
      </option>
    </select>

    <!--
        3) Computed properties
      totalFavoritos es una computed que devuelve cuántos pokémon tienen favorito = true.
    -->
    <p class="contador-favs">Favoritos: {{ totalFavoritos }}</p>

    <!--
        4) Componentes hijos + props + emits
      Delegamos cada tarjeta a <PokemonCard>.
      - Le pasamos la prop :pokemon
      - Recibimos el evento @toggle-favorito desde el componente hijo
      Esto es el patrón Padre → Hijo con props + emits.
    -->
    <ul class="pokemon-grid">
      <li
        v-for="pokemon in pokemonsFiltrados"
        :key="pokemon.id"
      >
        <PokemonCard
          :pokemon="pokemon"
          @toggle-favorito="toggleFavorito"
        />
      </li>
    </ul>

    <!--
      5) Renderizado condicional con v-if
      v-if crea o elimina el elemento del DOM según la condición.
      Aquí mostramos un mensaje cuando no hay resultados
      y la carga ya ha terminado.
    -->
    <p v-if="!loading && pokemonsFiltrados.length === 0" class="sin-resultados">
      No hay pokémon que coincidan con los filtros.
    </p>

    <!--
        6) Renderizado condicional con v-if
      Mostramos un texto u otro según 'mostrarInfo'.
    -->
    <button @click="mostrarInfo = !mostrarInfo" class="info-btn">
      {{ mostrarInfo ? "Ocultar información" : "Mostrar información" }}
    </button>

    <!--
      7) Renderizado condicional con v-show
      v-show NO elimina el elemento; solo cambia display: none/block.
      Aquí queremos que el texto exista siempre, pero pueda ocultarse.
    -->
    <p v-show="mostrarInfo" class="info-extra">
      Este proyecto ha sido desarrollado por Laura Folgado Galache.
    </p>
  </div>
</template>



<script setup>
/*
  Importamos ref y computed para usar la Composition API.
  También importamos el componente hijo PokemonCard.
*/

// SI QUEREMOS QUE SE CARGUE AUTOMATICAMENTE SIN HACER CLICK LA LISTA DE POKEMONS
//AÑADIMOS ONMOUNTED AL IMPORT

import { ref, computed, onMounted } from "vue"
import PokemonCard from "./PokemonCard.vue"
//Importamos la configuración de Axios
import api from "../utils/api"

const titulo = ref("Pokedex con VueJS + Fetch")

// mostrarInfo controla si aparece la sección informativa.
// Lo usamos con v-show en el template.
const mostrarInfo = ref(false)

// loading indica si hay una petición en curso.
// error guarda un posible mensaje de error de la petición.
const loading = ref(false)
const error = ref(null)

// La lista de pokémon ya no es estática: ahora vendrá de la API.
const pokemons = ref([])

/* Petición API con Fetch: esta función obtiene los 20 primeros pokemons */
  
async function cargarPokemons() {
  loading.value = true
  error.value = null
  pokemons.value = []

  try {
    // 1) Petición inicial con axios
    const respuesta = await api.get("/pokemon?limit=20")
    const lista = respuesta.data.results

    // 2) Peticiones en paralelo para cada pokémon
    const detalles = await Promise.all(
      lista.map(async (p) => {
        const info = await api.get(p.url)
        const data = info.data

        return {
          id: data.id,
          nombre: data.name,
          tipos: data.types.map(t => t.type.name),
          imagen: data.sprites.other["official-artwork"].front_default,
          favorito: false
        }
      })
    )

    pokemons.value = detalles
  } catch (err) {
    console.error("Error al cargar con Axios:", err.message)
    error.value = "No se pudieron cargar los pokémon. Inténtalo de nuevo más tarde."
  } finally {
    loading.value = false
  }
}

// Si queremos que se carguen los pokémon al montar el componente,
// llamamos a cargarPokemons() dentro de onMounted().
/*onMounted(() => {
  cargarPokemons()
})*/

const search = ref("")
const tipoSeleccionado = ref("todos")

/*
  tiposDisponibles
  Recorremos todos los pokémon, recogemos sus tipos, eliminamos duplicados y añadimos 'todos' como primera opción.
*/
const tiposDisponibles = computed(() => {
  const tipos = new Set()
  pokemons.value.forEach(p => p.tipos.forEach(t => tipos.add(t)))
  return ["todos", ...Array.from(tipos)]
})

/*
  Esta computed devuelve únicamente los pokémon que cumplen:
    - el nombre contiene search (sin distinguir mayúsculas/minúsculas)
    - el tipo coincide con tipoSeleccionado
*/
const pokemonsFiltrados = computed(() => {
  return pokemons.value.filter(pokemon => {
    const coincideNombre = pokemon.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const coincideTipo =
      tipoSeleccionado.value === "todos" ||
      pokemon.tipos.includes(tipoSeleccionado.value)

    return coincideNombre && coincideTipo
  })
})

/*
  toggleFavorito:
  Recibe un ID desde el componente hijo mediante emits.
  Busca el pokémon correspondiente y cambia su propiedad `favorito`.
*/
const toggleFavorito = id => {
  const pokemon = pokemons.value.find(p => p.id === id)
  if (pokemon) pokemon.favorito = !pokemon.favorito
}

/*
  totalFavoritos:
  Devuelve cuántos pokémon tienen favorito = true.
*/
const totalFavoritos = computed(() =>
  pokemons.value.filter(p => p.favorito).length
)
</script>



<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

.btn-cargar {
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border: none;
  background: #3a6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cargar:disabled {
  background: #999;
  cursor: not-allowed;
}

.error {
  color: #b00;
  margin-bottom: 0.5rem;
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

.contador-favs {
  margin: 1rem 0;
  font-weight: bold;
}

.sin-resultados {
  margin-top: 1rem;
  font-weight: bold;
  color: #c00;
}

.info-extra {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #eef;
  border-radius: 4px;
}
</style>