
# 🔤 1. conceptos básicos de Vue: interpolación, ref, v-bind y v-for

En este apartado empezamos a usar Vue para mostrar datos reales en la Pokedex.

---

## 🎯 objetivos

* Crear estado reactivo con `ref()`.
* Mostrar valores en el template con `{{ }}`.
* Enlazar atributos con `v-bind` / `:`.
* Recorrer listas con `v-for`.

---

## 📌 1. preparar datos de la pokedex

En `App.vue`:

```vue
<script setup>
import { ref } from 'vue'

const titulo = ref('pokedex vue')

const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', tipos: ['planta', 'veneno'], imagen: 'img/bulbasur.png' },
  { id: 4, nombre: 'charmander', tipos: ['fuego'], imagen: 'img/charmander.png' },
  { id: 7, nombre: 'squirtle', tipos: ['agua'], imagen: 'img/squirtle.png' },
  { id: 25, nombre: 'pikachu', tipos: ['eléctrico'], imagen: 'img/pikachu.png' }
])
</script>
```

---

## 📌 2. interpolación y v-bind

```vue
<template>
  <h1>{{ titulo }}</h1>

  <div>
    <img :src="pokemons[0].imagen" :alt="pokemons[0].nombre">
    <h3>#{{ pokemons[0].id }} {{ pokemons[0].nombre }}</h3>
    <p>tipos: {{ pokemons[0].tipos.join(', ') }}</p>
  </div>
</template>
```

---

## 📌 3. v-for (lista de pokémon)

```vue
<ul class="pokemon-grid">
  <li
    v-for="pokemon in pokemons"
    :key="pokemon.id"
  >
    <img :src="pokemon.imagen" :alt="pokemon.nombre">
    <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
    <p>tipos: {{ pokemon.tipos.join(', ') }}</p>
  </li>
</ul>
```

---

## 📝 ejercicios

1. Añade dos pokémon nuevos.
2. Muestra el número total:
   `total: {{ pokemons.length }}`
3. Cambia el orden de los pokémon en el array y observa qué ocurre.
4. Muestra solo los de tipo fuego usando `.filter()` en la plantilla.

---

## ✔️ siguiente apartado

**`docs/02-filtros-y-busqueda.md`** (v-model + computed)
