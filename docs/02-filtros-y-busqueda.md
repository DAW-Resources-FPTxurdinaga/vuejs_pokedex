# 🔍 02. Búsqueda y filtros en la Pokedex (v-model + computed)

En este apartado vas a mejorar la Pokedex añadiendo herramientas para buscar y filtrar pokémon.
Aprenderás a enlazar inputs con el estado usando `v-model` y a usar propiedades computadas para crear filtros dinámicos y eficientes.

---

## 🎯 Objetivos del apartado

* Usar `v-model` para enlazar inputs con valores reactivos.
* Entender qué aporta `v-model` frente a `@input` + `v-bind`.
* Crear propiedades computadas con `computed()`.
* Filtrar listas sin lógica repetida en el template.

---

# 📌 1. Preparar el estado en App.vue

Para poder buscar o filtrar, primero vas a crear dos valores reactivos:

* `search`: texto del buscador.
* `tipoSeleccionado`: tipo seleccionado en un `<select>`.

También generarás la lista de tipos disponible de forma automática.

```vue
<script setup>
import { ref, computed } from 'vue'

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

// texto del buscador
const search = ref('')

// tipo seleccionado en el filtro
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

# 📌 2. Crear la propiedad computada de filtrado

Ahora vas a crear una propiedad computada que devuelva solo los pokémon que cumplen los filtros.
Esta técnica es muy útil porque te permite mantener el template limpio y evitar duplicar lógica.

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

**Ideas clave:**

* `computed()` solo se recalcula cuando cambian las variables que usa.
* Filtrar aquí evita meter condiciones largas dentro del `v-for`.
* Este patrón (estado base + estado derivado) es profesional y escalable.

---

# 📌 3. Interfaz: buscador y select (v-model)

Ya puedes crear la interfaz que usa los filtros.
`v-model` permite que lo que escribas en el input se sincronice con la variable sin código adicional.

```vue
<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!-- buscador -->
    <input
      v-model="search"
      type="text"
      placeholder="buscar pokémon…"
      class="input-busqueda"
    />

    <!-- filtro por tipo -->
    <select v-model="tipoSeleccionado" class="input-tipo">
      <option
        v-for="tipo in tiposDisponibles"
        :key="tipo"
        :value="tipo"
      >
        {{ tipo }}
      </option>
    </select>

    <!-- listado filtrado -->
    <ul class="pokemon-grid">
      <li
        v-for="pokemon in pokemonsFiltrados"
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
  </div>
</template>
```

---

# 🎨 Estilos recomendados (opcionales)

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
</style>
```

---

# 📝 Ejercicios

Realiza estos ejercicios para practicar los conceptos de este apartado.

1. Crea una propiedad computada que devuelva solo los pokémon cuyo nombre **empiece por la letra que escribas** en un segundo input.

2. Añade un filtro que permita mostrar únicamente los pokémon que tengan **más de un tipo**.

3. Crea un contador que indique **cuántos pokémon hay de cada tipo** según los filtros aplicados.

4. Añade un botón **“limpiar filtros”** que deje todos los valores reactivos en su estado inicial.

5. Crea una propiedad computada adicional que devuelva una **lista ordenada alfabéticamente** de los pokémon filtrados.

---

Si quieres, hago ahora lo mismo con los ejercicios del **01** para dejarlos totalmente alineados con esta filosofía.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏭️ **Siguiente apartado**
[03 — Eventos y clases dinámicas](./03-eventos-y-clases-dinamicas.md)
