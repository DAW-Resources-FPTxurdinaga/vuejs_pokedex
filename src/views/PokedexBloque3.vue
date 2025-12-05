<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!--
        1) Input de búsqueda
      v-model enlaza el input con la variable 'search'.
      Cada vez que el usuario escribe, search cambia, lo que hace que 'pokemonsFiltrados' se recalcule automáticamente.
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
      'tiposDisponibles' es una computed que genera dinámicamente todas las opciones detectadas en los pokémon.
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
    Ahora, en lugar de escribir toda la tarjeta directamente aquí,
    delegamos la representación en el componente <PokemonCard>.
    Le pasamos: la prop :pokemon y el evento @toggle-favorito (emitido por el hijo).
    Esta es la estructura típica Padre → Hijo con props + emits.
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
      v-if crea o elimina el elemento del DOM dependiendo de la condición.
      Aquí mostramos un mensaje cuando no hay resultados.
    -->
    <p v-if="pokemonsFiltrados.length === 0" class="sin-resultados">
      No hay pokémon que coincidan con los filtros.
    </p>

    <!--
        6) Renderizado condicional con v-if
      Mostramos un texto u otro según el valor de 'mostrarInfo'.
      El usuario puede abrir/cerrar el panel informativo.
    -->
    <button @click="mostrarInfo = !mostrarInfo" class="info-btn">
      {{ mostrarInfo ? "Ocultar información" : "Mostrar información" }}
    </button>

    <!--
      7) Renderizado condicional con v-show
      A diferencia de v-if, v-if crea/elimina el elemento y v-show solo cambia display: none/block
      Aquí usamos v-show porque queremos que el texto exista siempre en el DOM pero visible/oculto según mostrarInfo.
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
import { ref, computed } from "vue"
import PokemonCard from "./PokemonCard.vue"

const titulo = ref("Pokedex con VueJS")

//  mostrarInfo controla si aparece o no el panel informativo.  Lo usamos con v-show en el template.
const mostrarInfo = ref(false)

//  Lista estática inicial de pokémons.
const pokemons = ref([
  { id: 1, nombre: "bulbasaur", tipos: ["planta", "veneno"], imagen: "img/bulbasur.png", favorito: false },
  { id: 4, nombre: "charmander", tipos: ["fuego"], imagen: "img/charmander.png", favorito: false },
  { id: 7, nombre: "squirtle", tipos: ["agua"], imagen: "img/squirtle.png", favorito: false },
  { id: 25, nombre: "pikachu", tipos: ["eléctrico"], imagen: "img/pikachu.png", favorito: false },
])

const search = ref("")
const tipoSeleccionado = ref("todos")

/*
  Recorremos todos los pokémon, recogemos sus tipos y eliminamos duplicados.
  Luego añadimos 'todos' como primera opción.
*/
const tiposDisponibles = computed(() => {
  const tipos = new Set()
  pokemons.value.forEach(p => p.tipos.forEach(t => tipos.add(t)))
  return ["todos", ...Array.from(tipos)]
})

/*
  Filtrado por nombre y tipo
  Esta computed devuelve únicamente los pokémon que cumplen:
    - nombre contiene search (no distingue mayúsculas/minúsculas)
    - tipo coincide o se ha seleccionado "todos"
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
  ToggleFavorito: evento emitido por PokemonCard.vue
  Esta función recibe un ID desde el componente hijo.
  Busca el pokémon correspondiente y cambia su estado.
*/
const toggleFavorito = id => {
  const pokemon = pokemons.value.find(p => p.id === id)
  if (pokemon) pokemon.favorito = !pokemon.favorito
}

/*
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
