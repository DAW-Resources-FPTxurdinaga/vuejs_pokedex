<!--
  Este componente representa UNA tarjeta de pokémon.
  Aquí aplicamos por primera vez dos conceptos clave de Vue 3:

  1) PROPS  → datos que recibe desde el componente padre.
  2) EMITS  → eventos que el componente hijo 'lanza' hacia el padre
              cuando ocurre algo (en este caso, un clic en favorito).

  Este es el paso natural después de tener la tarjeta directamente
  en App.vue. Ahora la encapsulamos, pero la lógica sigue funcionando
  igual gracias a props + emits.
-->

<template>
  <div class="pokemon-card" :class="{ favorito: pokemon.favorito }">
    <!--
      - Mostramos ★ o ☆ según el valor pokemon.favorito.
      - Cuando se hace clic, NO cambiamos el valor aquí.
        En su lugar, emitimos un evento ('toggle-favorito')
        para que el componente padre actualice los datos.

      → Esta separación es una BUENA PRÁCTICA:
        El hijo no modifica props, solo avisa.
    -->
    <button class="fav-btn" @click="emit('toggle-favorito', pokemon.id)">
      {{ pokemon.favorito ? '★' : '☆' }}
    </button>

    <!-- Imagen del pokémon -->
    <img
      :src="pokemon.imagen"
      :alt="pokemon.nombre"
      class="pokemon-image"
    >

    <!-- Nombre e ID -->
    <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>

    <!-- Tipos unidos con comas -->
    <p>Tipos: {{ pokemon.tipos.join(', ') }}</p>
  </div>
</template>

<script setup>
/*
  Mediante props definimos qué datos espera este componente.
  Aquí indicamos que "pokemon" es un objeto obligatorio para poder usar pokemon.id, pokemon.nombre...
  Otros tipos de datos posibles: String, Number, Boolean, Array, Function, etc.
  */
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

/*
  Los emits permiten que el componente hijo envíe eventos al padre.
  En este caso, definimos un evento: "toggle-favorito", que se enviará cuando el usuario pulse la estrella.
  El componente padre podrá escucharlo así: <PokemonCard @toggle-favorito="toggleFavorito" />
*/
const emit = defineEmits(['toggle-favorito'])
</script>



<style scoped>
/* Estilos encapsulados gracias a 'scoped' */

.pokemon-card {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  text-align: center;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  position: relative;
}

.pokemon-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.fav-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.4rem;
  position: absolute;
  top: 8px;
  right: 8px;
}

.favorito {
  border: 2px solid gold;
}
</style>
