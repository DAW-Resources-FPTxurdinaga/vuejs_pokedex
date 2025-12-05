<!-- src/views/PokemonDetalleView.vue -->

<template>
  <div class="detalle">
    <h1>Detalle de Pokémon</h1>

    <!-- 1) Estado de carga -->
    <p v-if="loading">Cargando datos del pokémon...</p>

    <!-- 2) Estado de error -->
    <p v-else-if="error" class="error">
      {{ error }}
    </p>

    <!-- 3) Datos del pokémon -->
    <div v-else-if="pokemon" class="card">
      <img
        :src="pokemon.imagen"
        :alt="pokemon.nombre"
        class="pokemon-image"
      >

      <h2>#{{ pokemon.id }} {{ pokemon.nombre }}</h2>

      <p><strong>Tipos:</strong> {{ pokemon.tipos.join(', ') }}</p>
      <p><strong>Peso:</strong> {{ pokemon.peso }} kg</p>
      <p><strong>Altura:</strong> {{ pokemon.altura }} m</p>
    </div>

    <!-- 4) Caso raro: no hay datos ni error -->
    <p v-else>
      No se ha podido cargar la información del pokémon.
    </p>
  </div>
</template>

<script setup>
/*
  Este componente se usa con una ruta dinámica:
    /pokemon/:id

  Ejemplos:
    /pokemon/1
    /pokemon/25

  1) Leemos el parámetro de la URL con useRoute()
  2) Hacemos una petición con fetch a la PokeAPI
  3) Guardamos el resultado en un ref() reactivo
*/

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

// Obtenemos el objeto route para leer los parámetros de la URL
const route = useRoute()

// Estado reactivo para el pokémon, la carga y los errores
const pokemon = ref(null)
const loading = ref(false)
const error = ref(null)

/*
  Función asíncrona que carga los datos del pokémon según el id de la ruta.

  Ejemplo de URL:
  https://pokeapi.co/api/v2/pokemon/25
*/
async function cargarPokemon() {
  // Indicamos que empezamos una petición
  loading.value = true
  error.value = null
  pokemon.value = null

  // id viene de la URL: /pokemon/:id
  const id = route.params.id

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const data = await respuesta.json()

    // Transformamos los datos de la API al formato que nos interesa
    pokemon.value = {
      id: data.id,
      nombre: data.name,
      tipos: data.types.map(t => t.type.name),
      imagen: data.sprites.other["official-artwork"].front_default,
      peso: data.weight / 10,   // la API devuelve hectogramos → kilos
      altura: data.height / 10  // la API devuelve decímetros → metros
    }
  } catch (err) {
    console.error("Error al cargar el pokémon:", err)
    error.value = "No se pudo cargar la información del pokémon."
  } finally {
    loading.value = false
  }
}

// Cuando se monta el componente, lanzamos la petición automáticamente
onMounted(() => {
  cargarPokemon()
})
</script>

<style scoped>
.detalle {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

.card {
  margin-top: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.pokemon-image {
  width: 220px;
  height: 220px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.error {
  color: #b00;
  font-weight: bold;
}
</style>
