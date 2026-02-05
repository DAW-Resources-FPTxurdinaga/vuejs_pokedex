<template>
  <div class="app">
    <h1>Bloque 7: Favoritos con Pinia</h1>

    <!-- Panel de información de Pinia -->
    

    <!-- Lista de Pokémon -->
    <ul class="pokemon-grid">
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card">
        
        <img :src="pokemon.imagen" :alt="pokemon.nombre" />
        
        <h3>{{ pokemon.nombre }}</h3>
        
      </li>
    </ul>

  </div>
</template>

<script setup>

// Lista simple de datos (sin propiedades extra ni computed)
const pokemons = ref([
  { id: 1, nombre: "bulbasaur", imagen: "img/bulbasur.png" },
  { id: 4, nombre: "charmander", imagen: "img/charmander.png" },
  { id: 7, nombre: "squirtle", imagen: "img/squirtle.png" },
  { id: 25, nombre: "pikachu", imagen: "img/pikachu.png" },
])
</script>

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
