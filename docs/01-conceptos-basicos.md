# 🔤 01. Conceptos básicos de Vue: interpolación, `ref`, `v-bind` y `v-for`

En este apartado das los primeros pasos con Vue dentro de la Pokedex. Verás cómo mostrar información en pantalla, cómo guardar datos reactivos y cómo recorrer listas para generar contenido dinámico.

📄 **Archivo de este apartado:** `src/views/PokedexBloque1.vue`
🌐 **Ruta en la app:** `/bloque1`

---

## 🎯 Objetivos del apartado

* Crear valores reactivos con `ref()`.
* Mostrar información en el template con interpolación (`{{ }}`).
* Enlazar atributos HTML con `v-bind` (`:`).
* Recorrer listas con `v-for` y claves únicas con `:key`.

---

## 🧭 Cómo está organizado el archivo

El archivo `PokedexBloque1.vue` contiene los tres pasos del apartado. Los pasos que no están activos están **comentados**, para que puedas activarlos uno a uno:

* **Paso 1:** estructura vacía, sin datos.
* **Paso 2:** interpolación y un único pokémon.
* **Paso 3:** lista completa con `v-for`.

Cuando trabajes en el archivo, comenta el paso anterior antes de activar el siguiente.

---

# 📌 1. Preparar los datos iniciales

Empezamos creando un título y una pequeña lista de pokémon. Los datos viven en el `<script setup>`:

```vue
<script setup>
import { ref } from 'vue'

const titulo = ref('Pokedex con VueJS')

// lista mínima de pokémon en duro
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

**Ideas clave:**

* `ref()` envuelve un valor para que Vue lo vigile. Cuando cambia, la pantalla se actualiza sola.
* Dentro del `<script>` accedes al valor con `.value` (`titulo.value`). En el template **no** hace falta.

---

# 📌 2. Interpolación y `v-bind`

Mostramos un único pokémon como vista previa. Con `{{ }}` escribimos valores de texto y con `:` (`v-bind`) enlazamos atributos HTML:

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

**Ideas clave:**

* `{{ titulo }}` muestra el valor de la variable.
* `:src` es la forma corta de `v-bind:src`: el atributo toma el valor de una expresión de JavaScript.
* Las expresiones pueden ser cualquier cosa válida en JavaScript: `join(', ')`, plantillas de cadena, operaciones…

---

# 📌 3. Listas con `v-for` y `:key`

Ahora generamos la lista completa recorriendo el array con `v-for`. Es un patrón que vas a usar en casi todos los apartados:

```vue
<template>
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
          <p>Tipos: {{ pokemon.tipos.join(', ') }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
```

**Ideas clave:**

* `v-for="pokemon in pokemons"` crea un elemento por cada pokémon.
* `:key` identifica cada elemento de forma única. Usa un valor estable (aquí el `id`), nunca el índice del array si la lista puede cambiar.

---

# 🎨 Estilos básicos

Los estilos de `PokedexBloque1.vue` van en un bloque `<style scoped>`: solo afectan a este componente.

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

# 📝 Ejercicios

1. Crea una propiedad computada (`computed`) que devuelva **el número de tipos distintos** que hay entre todos los pokémon.
2. Añade un botón que **cambie el valor de `titulo`** a otro texto y que, al volver a pulsarlo, restaure el original.
3. Crea una sección que muestre **solo los nombres** de los pokémon con otro `v-for`, separado del listado de tarjetas.
4. Añade un valor reactivo booleano que permita **mostrar u ocultar** la lista completa con un botón.
5. Crea una propiedad computada que devuelva solo los pokémon con `id` menor que 10 y muéstralos debajo del listado principal.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[00 — Creación del proyecto](./00-creacion-proyecto.md)

⏭️ **Siguiente apartado**
[02 — Filtros y búsqueda](./02-filtros-y-busqueda.md)
