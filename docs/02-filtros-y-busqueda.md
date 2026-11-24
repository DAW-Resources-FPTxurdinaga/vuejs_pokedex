# 🔍 02. Búsqueda y filtros en la Pokedex (v-model + computed)

En este apartado mejoras la Pokedex añadiendo herramientas para buscar y filtrar pokémon. Aprenderás a enlazar inputs con el estado usando `v-model` y a crear propiedades computadas para filtrar listas de forma eficiente.

📄 **Archivo de este apartado:** `src/views/PokedexBloque2.vue`
🌐 **Ruta en la app:** `/bloque2`

> En ese mismo archivo verás también la parte de favoritos. Esa parte se explica en el apartado [03](./03-eventos-y-clases-dinamicas.md).

---

## 🎯 Objetivos del apartado

* Usar `v-model` para enlazar inputs con valores reactivos.
* Entender qué aporta `v-model` frente a `:value` + `@input`.
* Crear propiedades computadas con `computed()`.
* Filtrar listas sin repetir lógica en el template.

---

# 📌 1. Preparar el estado

Para poder buscar o filtrar necesitamos dos valores reactivos:

* `search`: texto del buscador.
* `tipoSeleccionado`: tipo elegido en el `<select>`.

También generamos la lista de tipos disponibles de forma automática, a partir de los datos:

```vue
<script setup>
import { ref, computed } from 'vue'

const titulo = ref('Pokedex con VueJS')

const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', tipos: ['planta', 'veneno'], imagen: '/img/bulbasaur.png', favorito: false },
  { id: 4, nombre: 'charmander', tipos: ['fuego'], imagen: '/img/charmander.png', favorito: false },
  { id: 7, nombre: 'squirtle', tipos: ['agua'], imagen: '/img/squirtle.png', favorito: false },
  { id: 25, nombre: 'pikachu', tipos: ['eléctrico'], imagen: '/img/pikachu.png', favorito: false }
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

**Ideas clave:**

* `new Set()` elimina los tipos repetidos (por ejemplo, "planta" aparece una sola vez aunque haya varios pokémon de ese tipo).
* `tiposDisponibles` se calcula sola: si añades un pokémon nuevo con un tipo nuevo, aparece en el `<select>` sin tocar nada más.

---

# 📌 2. Crear la propiedad computada de filtrado

Creamos una `computed` que devuelve solo los pokémon que cumplen los dos filtros a la vez:

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

* `computed()` se recalcula solo cuando cambian las variables que usa (`pokemons`, `search` o `tipoSeleccionado`).
* Filtrar en la `computed` evita meter condiciones largas dentro del `v-for`.
* El patrón **estado base + estado derivado** es el mismo que usarás con Pinia más adelante.

---

# 📌 3. Interfaz: buscador y select con `v-model`

Ahora creamos los controles y el listado filtrado:

```vue
<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <!-- Buscador: v-model sincroniza el texto con search -->
    <input
      v-model="search"
      type="text"
      placeholder="buscar pokémon…"
      class="input-busqueda"
    />

    <!-- Filtro por tipo: v-model sincroniza la opción con tipoSeleccionado -->
    <select v-model="tipoSeleccionado" class="input-tipo">
      <option
        v-for="tipo in tiposDisponibles"
        :key="tipo"
        :value="tipo"
      >
        {{ tipo }}
      </option>
    </select>

    <!-- Listado filtrado: usamos la computed, no la lista completa -->
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

    <p v-if="pokemonsFiltrados.length === 0" class="sin-resultados">
      No hay pokémon que coincidan con los filtros.
    </p>
  </div>
</template>
```

**Ideas clave:**

* `v-model` es un atajo para `:value` + `@input` (en el `<select>`, para `@change`). Escribir en el input actualiza `search` y, a la vez, la `computed` se recalcula.
* En el template usamos `pokemonsFiltrados`, nunca `pokemons` directamente. Así el listado siempre refleja los filtros.

---

# 🎨 Estilos recomendados

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

1. Crea un segundo input y una propiedad computada que devuelva solo los pokémon cuyo nombre **empiece** por la letra que escribas.
2. Añade un filtro que permita mostrar únicamente los pokémon que tengan **más de un tipo**.
3. Muestra un contador con **cuántos pokémon hay de cada tipo** según los filtros aplicados.
4. Añade un botón **«Limpiar filtros»** que deje `search` y `tipoSeleccionado` en su valor inicial.
5. Crea una propiedad computada que devuelva los pokémon filtrados **ordenados alfabéticamente** por nombre (pista: `[...lista].sort(...)`, para no modificar el array original).

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[01 — Conceptos básicos](./01-conceptos-basicos.md)

⏭️ **Siguiente apartado**
[03 — Eventos y clases dinámicas](./03-eventos-y-clases-dinamicas.md)
