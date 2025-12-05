<!-- src/App.vue -->

<!-- Template sirve para definir la estructura HTML que se renderiza en la aplicación -->
<!-- A diferencia de div, template no genera un elemento adicional en el DOM -->

<!-- PASO 1. SIN DATOS -->
<!--template>
  <div class="app">
    <h1>Pokedex con VueJS</h1>
    <p>Primer proyecto con VueJS</p>
  </div>
</template-->

<!-- PASO 2. CON INTERPOLACION - UN POKEMON -->
<!--template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <section class="preview">
      <h2>Vista previa</h2>

      <div class="pokemon-card">
        <img
          :src="pokemons[0].imagen"
          :alt="`imagen de ${pokemons[0].nombre}`"
          class="pokemon-image"
        >
        <h3>#{{ pokemons[0].id }} {{ pokemons[0].nombre }}</h3>
        <p>tipos: {{ pokemons[0].tipos.join(', ') }}</p>
      </div>
    </section>
  </div>
</template-->

<!-- PASO 3. CON V-FOR y :KEY-->
 <template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <section class="listado">
      <h2>Lista de pokémons (versión estática)</h2>

      <ul class="pokemon-grid">
        <li
          v-for="pokemon in pokemons"
          :key="pokemon.id"
        >
          <div class="pokemon-card">
            <img
              :src="pokemon.imagen"
              :alt="`imagen de ${pokemon.nombre}`"
              class="pokemon-image"
            >
            <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
            <p>tipos: {{ pokemon.tipos.join(', ') }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>



<!-- src/App.vue -->
<!-- script setup se utiliza para definir la lógica del componente -->
<!-- setup es obligatorio si utilizamos Composition API -->
<script setup>
// PASO 1. SIN LOGICA

// PASO 2. REACTIVIDAD CON COMPOSITION API
import { ref } from 'vue'

const titulo = ref('Pokedex con VueJS')

// lista mínima de pokémon en duro
const pokemons = ref([
  {
    id: 1,
    nombre: 'bulbasaur',
    tipos: ['planta', 'veneno'],
    imagen: 'img/bulbasur.png'
  },
  {
    id: 4,
    nombre: 'charmander',
    tipos: ['fuego'],
    imagen: 'img/charmander.png'
  },
  {
    id: 7,
    nombre: 'squirtle',
    tipos: ['agua'],
    imagen: 'img/squirtle.png'
  },
  {
    id: 25,
    nombre: 'pikachu',
    tipos: ['eléctrico'],
    imagen: 'img/pikachu.png'
  }
])

</script>

<!-- style scoped aplica estilos solo a este componente -->
<style scoped>
/* PASO 1. SIN ESTILOS ESPECIALES */
/*
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1 {
  margin-bottom: 0.5rem;
}

p {
  margin: 0;
  color: #555;
}*/

/* PASO 2 Y 3. CON ESTILOS ESPECIALES */
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1 {
  margin-bottom: 1rem;
}

.preview {
  margin-top: 1.5rem;
}

.pokemon-card {
  display: inline-block;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.pokemon-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
/* PASO 3. AÑADIMOS ESTILOS PARA LISTADO */

.listado {
  margin-top: 2rem;
}

.pokemon-grid {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
</style>

