# 📄 **02-filtros-y-busqueda.md — Búsqueda con v-model y filtros con computed**

Aquí tienes el documento listo para copiar/pegar:

---

# 🔍 2. búsqueda y filtros en la pokedex (v-model + computed)

En este apartado añadiremos a la Pokedex:

* Un **buscador por nombre** usando `v-model`.
* Un **filtro por tipo** usando `<select>`.
* Una **propiedad computada** para mostrar solo los pokémon que coinciden.

---

## 🎯 objetivos de este apartado

* Usar **v-model** para enlazar inputs con estado reactivo.
* Entender la diferencia entre `v-model` y `@input + v-bind`.
* Crear **propiedades computadas** con `computed()`.
* Filtrar listas de forma eficiente sin repetir lógica en el template.

---

## 📁 1. preparar el estado en App.vue

Añadimos dos estados nuevos:

* `search`: texto que escribe el usuario.
* `tipoSeleccionado`: tipo elegido en un `<select>`.

```vue
<script setup>
import { ref, computed } from 'vue'

const titulo = ref('pokedex vue')

const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', tipos: ['planta', 'veneno'], imagen: 'https://...' },
  { id: 4, nombre: 'charmander', tipos: ['fuego'], imagen: 'https://...' },
  { id: 7, nombre: 'squirtle', tipos: ['agua'], imagen: 'https://...' },
  { id: 25, nombre: 'pikachu', tipos: ['eléctrico'], imagen: 'https://...' }
])

// 🔍 nuevo: búsqueda por nombre
const search = ref('')

// 🔥 nuevo: filtro por tipo
const tipoSeleccionado = ref('todos')

// lista de tipos detectada automáticamente
const tiposDisponibles = computed(() => {
  const tipos = new Set()
  pokemons.value.forEach(p => p.tipos.forEach(t => tipos.add(t)))
  return ['todos', ...Array.from(tipos)]
})
</script>
```

---

## 📌 2. crear las propiedades computadas de filtrado

Creamos una **computed** que devuelva solo los Pokémon que cumplen los filtros.

```vue
<script setup>
// ...

const pokemonsFiltrados = computed(() => {
  return pokemons.value.filter(pokemon => {
    const coincideNombre = pokemon.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const coincideTipo =
      tipoSeleccionado.value === 'todos' ||
      pokemon.tipos.includes(tipoSeleccionado.value)

    return coincideNombre && coincideTipo
  })
})
</script>
```

Puntos clave para explicar:

* **No** filtramos en el template (eso lo veremos en fundamentos avanzados).
* `computed()` *se recalcule solo cuando cambien sus dependencias*, no en cada render.
* Se enseña el patrón profesional: **estado crudo** + **estado derivado**.

---

## 🧩 3. interfaz: input + select (v-model)

En el `<template>`:

```vue
<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!-- 1) buscador -->
    <input
      v-model="search"
      type="text"
      placeholder="buscar pokémon…"
      class="input-busqueda"
    />

    <!-- 2) filtro por tipo -->
    <select v-model="tipoSeleccionado" class="input-tipo">
      <option v-for="tipo in tiposDisponibles" :key="tipo" :value="tipo">
        {{ tipo }}
      </option>
    </select>

    <!-- 3) listado filtrado -->
    <ul class="pokemon-grid">
      <li v-for="pokemon in pokemonsFiltrados" :key="pokemon.id">
        <img :src="pokemon.imagen" :alt="pokemon.nombre">
        <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
        <p>tipos: {{ pokemon.tipos.join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>
```

---

## ✨ 4. estilos propuestos (opcionales)

```vue
<style scoped>
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
</style>
```

---

## 📝 ejercicios

### ✔️ nivel básico

1. Muestra encima del listado:
   `Mostrando {{ pokemonsFiltrados.length }} resultados.`
2. Haz que el buscador no distinga entre mayúsculas/minúsculas (ya ocurre, pero que lo expliquen).

### ✔️ nivel medio

3. Añade un contador que indique cuántos hay de cada tipo.
4. Añade un botón **"limpiar filtros"**.

### ✔️ nivel avanzado

5. Haz una computed adicional que devuelva solo los pokémon cuyo nombre empieza por una letra concreta (por ejemplo, `b`).
6. Crea otro filtro que muestre pokémon solo con más de un tipo.

---

## ✔️ siguiente apartado

`03-eventos-y-clases-dinamicas.md`
