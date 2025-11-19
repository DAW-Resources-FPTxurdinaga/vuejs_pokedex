# 🔤 01. Conceptos básicos de Vue: Interpolación, `ref`, `v-bind` y `v-for`

En este apartado vas a dar los primeros pasos con Vue dentro de la Pokedex.
Verás cómo mostrar información en pantalla, cómo almacenar datos reactivos y cómo recorrer listas para generar contenido dinámico.

---

## 🎯 Objetivos del apartado

* Crear valores reactivos con `ref()`.
* Mostrar información en el template mediante interpolación (`{{ }}`).
* Enlazar atributos HTML usando `v-bind` (`:`).
* Recorrer listas usando `v-for` y claves únicas.

Estos conceptos te permitirán construir la base de cualquier aplicación Vue.

---

# 📌 1. Preparar datos iniciales de la Pokedex

Vamos a empezar creando un título y una pequeña lista de pokémon.
Con esto podrás practicar cómo se muestran datos en la interfaz.

```vue
<!-- App.vue -->
<script setup>
import { ref } from 'vue'

const titulo = ref('pokedex vue')

const pokemons = ref([
  {
    id: 1,
    nombre: 'bulbasaur',
    tipos: ['planta', 'veneno'],
    imagen: '/img/bulbasaur.png'
  },
  {
    id: 4,
    nombre: 'charmander',
    tipos: ['fuego'],
    imagen: '/img/charmander.png'
  },
  {
    id: 7,
    nombre: 'squirtle',
    tipos: ['agua'],
    imagen: '/img/squirtle.png'
  },
  {
    id: 25,
    nombre: 'pikachu',
    tipos: ['eléctrico'],
    imagen: '/img/pikachu.png'
  }
])
</script>
```

---

# 📌 2. Interpolación y uso de `v-bind`

En este apartado vas a practicar cómo mostrar valores en el template y cómo enlazar atributos HTML usando `:`.
De momento trabajaremos con un solo pokémon para que el ejemplo sea sencillo.

```vue
<template>
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
        <p>Tipos: {{ pokemons[0].tipos.join(', ') }}</p>
      </div>
    </section>
  </div>
</template>
```

---

# 📌 3. Listas con `v-for` y `:key`

Una vez que ya sabes mostrar un pokémon, vas a generar la lista completa recorriendo el array con `v-for`.
Este patrón es fundamental, porque lo usarás continuamente en Vue.

```vue
<template>
  <section class="listado">
    <h2>Lista de pokémon</h2>

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
          <p>Tipos: {{ pokemon.tipos.join(', ') }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
```

---

# 🎨 Estilos básicos

Puedes añadir este estilo mínimo para que las tarjetas tengan una apariencia más cuidada:

```vue
<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

.pokemon-card {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.pokemon-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.pokemon-grid {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
</style>
```

---


# 📝 Ejercicios (versión revisada para el apartado 01)

Realiza estos ejercicios para practicar los conceptos de este apartado.

1. Crea una propiedad computada que devuelva **el número total de tipos distintos** presentes en todos los pokémon.

2. Añade un botón que **cambie dinámicamente el título** (`titulo`) a otro texto y vuelve a pulsarlo para restaurarlo.
   (Practicas reactividad y eventos básicos.)

3. Crea una sección que muestre **solo los nombres** de todos los pokémon usando otro `v-for`, diferente del listado de tarjetas.

4. Añade un nuevo valor reactivo que permita mostrar u ocultar la lista completa con un botón.

5. Crea un filtro muy simple dentro de una propiedad computada que devuelva únicamente los pokémon cuya **identificación sea menor que 10**, y muéstralos debajo de la lista principal.

---

Si quieres, ahora te genero el **apartado 04 — Componentes (props + emits)** siguiendo exactamente la misma estructura que los apartados 01–03.


---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏭️ **Siguiente apartado**
[02 — Filtros y búsqueda](./02-filtros-y-busqueda.md)