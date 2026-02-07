import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
    // Estado: Variables que cambian
  const pokemons = ref([])
  const favoritos = ref([])

  // Getters: Variables calculadas a partir del estado
  const totalFavoritos = computed(() => favoritos.value.length)
  
  // Acciones: Funciones que modifican el estado
  // list es la lista de pokemons que obtenemos de la API
  const setPokemons = (list) => {
    pokemons.value = list
  }

  const agregarFavorito = (pokemonId) => {
    if (!favoritos.value.includes(pokemonId)) {
      favoritos.value.push(pokemonId)
    }
  }

    // Filtramos el array para eliminar el ID del Pokémon
    // que queremos eliminar y asignamos el nuevo array a favoritos.value
  const eliminarFavorito = (pokemonId) => {
    favoritos.value = favoritos.value.filter(id => id !== pokemonId)
  }

  // Función que alterna el estado de favorito: si el ID ya está en favoritos, lo elimina; si no, lo agrega
  const alternarFavorito = (pokemonId) => {
    if (favoritos.value.includes(pokemonId)) {
      eliminarFavorito(pokemonId)
    } else {
      agregarFavorito(pokemonId)
    }
  }

  // Función que verifica si un Pokémon es favorito (devuelve true o false)
  const esFavorito = (pokemonId) => {
    return favoritos.value.includes(pokemonId)
  }

  // Retornamos el estado, getters y acciones para que estén disponibles en los componentes
  return { 
    pokemons, 
    favoritos, 
    totalFavoritos,
    setPokemons, 
    agregarFavorito, 
    eliminarFavorito, 
    alternarFavorito,
    esFavorito
  }
})
