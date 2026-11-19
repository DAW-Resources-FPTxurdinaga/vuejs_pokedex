# 🧩 04. Componentes hijos: props, emits y renderizado condicional

Hasta ahora todo el código de la tarjeta estaba en el mismo archivo. En este apartado **separamos la tarjeta en un componente hijo** (`PokemonCard.vue`) y aprendemos cómo se comunican padre e hijo.

📄 **Archivos de este apartado:**

* `src/views/PokedexBloque3.vue` → componente padre (la lista y el estado).
* `src/views/PokemonCard.vue` → componente hijo (una tarjeta).

🌐 **Ruta en la app:** `/bloque3`

---

## 🎯 Objetivos del apartado

* Crear un componente hijo y usarlo dentro de otro.
* Pasar datos del padre al hijo con **props**.
* Avisar del hijo al padre con **emits**.
* Diferenciar `v-if` de `v-show`.

---

## 🔁 La idea principal: los datos bajan, los eventos suben

```
PokedexBloque3.vue (padre)
  │  pokemon  (prop)  ───────▶  PokemonCard.vue (hijo)
  │                                  │
  │  toggleFavorito(id)  ◀───────────┘  emit('toggle-favorito', id)
```

* El **padre** guarda los datos y decide qué cambia.
* El **hijo** muestra los datos que recibe y, cuando el usuario pulsa algo, **avisa** al padre. **No modifica** los datos que le llegan.

---

# 📌 1. El componente hijo: `PokemonCard.vue`

Esta es la tarjeta de un pokémon. Declaramos qué datos espera (`props`) y qué eventos puede lanzar (`emits`):

```vue
<template>
  <div class="pokemon-card" :class="{ favorito: pokemon.favorito }">
    <!-- Al pulsar, NO cambiamos el valor aquí: avisamos al padre -->
    <button class="fav-btn" @click="emit('toggle-favorito', pokemon.id)">
      {{ pokemon.favorito ? '★' : '☆' }}
    </button>

    <img :src="pokemon.imagen" :alt="pokemon.nombre" class="pokemon-image">

    <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
    <p>Tipos: {{ pokemon.tipos.join(', ') }}</p>
  </div>
</template>

<script setup>
// PROPS: datos que el padre nos pasa
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

// EMITS: eventos que este componente puede enviar al padre
const emit = defineEmits(['toggle-favorito'])
</script>
```

**Ideas clave:**

* `defineProps` declara las **props**. Puedes indicar `type` y si son `required`.
* `defineEmits` declara los **eventos** que el hijo puede lanzar con `emit('nombre', dato)`.
* Un hijo **nunca** debe modificar sus props. Si lo hace, el padre pierde el control de sus datos.

---

# 📌 2. El componente padre: `PokedexBloque3.vue`

El padre usa `<PokemonCard>` dentro de un `v-for`, le pasa la prop `:pokemon` y escucha el evento `@toggle-favorito`:

```vue
<script setup>
import { ref, computed } from 'vue'
import PokemonCard from './PokemonCard.vue'

const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', tipos: ['planta', 'veneno'], imagen: '/img/bulbasaur.png', favorito: false },
  { id: 4, nombre: 'charmander', tipos: ['fuego'], imagen: '/img/charmander.png', favorito: false },
  { id: 7, nombre: 'squirtle', tipos: ['agua'], imagen: '/img/squirtle.png', favorito: false },
  { id: 25, nombre: 'pikachu', tipos: ['eléctrico'], imagen: '/img/pikachu.png', favorito: false }
])

// ...buscador, filtros (pokemonsFiltrados) y totalFavoritos: ver apartados 02 y 03

// El padre es el único que cambia los datos
const toggleFavorito = id => {
  const pokemon = pokemons.value.find(p => p.id === id)
  if (pokemon) pokemon.favorito = !pokemon.favorito
}
</script>

<template>
  <ul class="pokemon-grid">
    <li v-for="pokemon in pokemonsFiltrados" :key="pokemon.id">
      <PokemonCard
        :pokemon="pokemon"
        @toggle-favorito="toggleFavorito"
      />
    </li>
  </ul>
</template>
```

**Ideas clave:**

* `:pokemon="pokemon"` pasa un dato del padre al hijo (los dos puntos indican que es una expresión, no un texto fijo).
* `@toggle-favorito="toggleFavorito"` escucha el evento que lanza el hijo y ejecuta la función del padre.
* El nombre del evento en el hijo y en el padre es el mismo: `toggle-favorito`.

---

# 📌 3. Renderizado condicional: `v-if` y `v-show`

El padre muestra un mensaje cuando no hay resultados (`v-if`) y un bloque de información que se puede ocultar (`v-show`):

```vue
<p v-if="pokemonsFiltrados.length === 0" class="sin-resultados">
  No hay pokémon que coincidan con los filtros.
</p>

<button @click="mostrarInfo = !mostrarInfo">
  {{ mostrarInfo ? 'Ocultar información' : 'Mostrar información' }}
</button>

<p v-show="mostrarInfo" class="info-extra">
  Este proyecto ha sido desarrollado por Laura Folgado Galache.
</p>
```

| Directiva | Qué hace | Cuándo usarla |
|---|---|---|
| `v-if` | Crea o **elimina** el elemento del DOM | Cuando la condición casi nunca cambia, o el contenido es pesado |
| `v-show` | Cambia solo `display: none` | Cuando se alterna mucho y el elemento debe existir siempre |

---

# 🎨 Estilos

Cada componente tiene sus propios estilos con `scoped`. Los de la tarjeta están en `PokemonCard.vue`; el padre solo necesita la rejilla:

```vue
<style scoped>
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

# 📝 Ejercicios

1. Añade a `PokemonCard.vue` una prop opcional `mostrarTipos` (`Boolean`, por defecto `true`) y úsala con `v-if` para ocultar la línea de tipos.
2. Crea un evento `ver-detalle` en el hijo que se lance al pulsar la imagen, y haz que el padre muestre un `alert` con el nombre del pokémon.
3. Explica con tus palabras qué pasaría si `PokemonCard.vue` hiciera `pokemon.favorito = !pokemon.favorito` en lugar de emitir el evento.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[03 — Eventos y clases dinámicas](./03-eventos-y-clases-dinamicas.md)

⏭️ **Siguiente apartado**
[05 — Peticiones con fetch](./05-fetch.md)
