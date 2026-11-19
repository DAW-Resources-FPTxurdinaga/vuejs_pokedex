# 🔥 03. Eventos y clases dinámicas en la Pokedex

En este apartado añades interactividad a la Pokedex. Aprenderás a escuchar eventos, modificar el estado de los pokémon y aplicar estilos según ese estado.

📄 **Archivo de este apartado:** `src/views/PokedexBloque2.vue` (la parte de favoritos)
🌐 **Ruta en la app:** `/bloque2`

> Este apartado continúa el archivo del [apartado 02](./02-filtros-y-busqueda.md). Si ya tienes los filtros, solo tienes que añadir lo que se explica aquí.

---

## 🎯 Objetivos del apartado

* Escuchar eventos del usuario con `@click`.
* Modificar propiedades dentro de un array reactivo.
* Aplicar clases dinámicas con `:class="{ … }"`.
* Crear una propiedad computada que derive información del estado (número de favoritos).

---

# 📌 1. Añadir la propiedad `favorito` a cada pokémon

Cada pokémon necesita su propio estado de favorito. Para eso añadimos la propiedad `favorito` al array inicial:

```vue
<script setup>
import { ref } from 'vue'

const pokemons = ref([
  { id: 1, nombre: 'bulbasaur', tipos: ['planta', 'veneno'], imagen: '/img/bulbasaur.png', favorito: false },
  { id: 4, nombre: 'charmander', tipos: ['fuego'], imagen: '/img/charmander.png', favorito: false },
  { id: 7, nombre: 'squirtle', tipos: ['agua'], imagen: '/img/squirtle.png', favorito: false },
  { id: 25, nombre: 'pikachu', tipos: ['eléctrico'], imagen: '/img/pikachu.png', favorito: false }
])
</script>
```

---

# 📌 2. Crear la función `toggleFavorito(id)`

Creamos una función que cambia el valor de `favorito` de un pokémon cada vez que se llama. Así alternamos entre marcado y desmarcado:

```vue
<script setup>
// ...

const toggleFavorito = (id) => {
  const pokemon = pokemons.value.find(p => p.id === id)
  if (pokemon) {
    pokemon.favorito = !pokemon.favorito
  }
}
</script>
```

**Ideas clave:**

* `find()` localiza al pokémon por su `id`.
* Al cambiar `pokemon.favorito`, Vue actualiza la pantalla automáticamente.
* Dentro del template no necesitas `.value`.

---

# 📌 3. Escuchar eventos con `@click`

Dentro del listado añadimos un botón para marcar o desmarcar cada pokémon:

```vue
<button
  class="fav-btn"
  @click="toggleFavorito(pokemon.id)"
>
  {{ pokemon.favorito ? '★' : '☆' }}
</button>
```

Con `@click` indicamos qué función ejecutar al pulsar. Con el operador `?:` mostramos un icono u otro según el estado.

---

# 📌 4. Aplicar clases dinámicas

Para resaltar los favoritos, añadimos la clase `favorito` solo cuando `pokemon.favorito` es `true`:

```vue
<li
  v-for="pokemon in pokemonsFiltrados"
  :key="pokemon.id"
  :class="{ favorito: pokemon.favorito }"
>
```

Y en los estilos:

```css
.favorito {
  border: 2px solid gold;
  border-radius: 8px;
}
```

**Ideas clave:**

* `:class="{ nombreClase: condicion }"` añade la clase solo si la condición es verdadera.
* Así adaptas la interfaz a los datos sin duplicar HTML.

---

# 📌 5. Contador de favoritos con `computed`

Creamos una propiedad computada que cuenta cuántos pokémon están marcados:

```vue
<script setup>
// ...

const totalFavoritos = computed(() =>
  pokemons.value.filter(p => p.favorito).length
)
</script>
```

Y lo mostramos en el template:

```vue
<p class="contador-favs">
  Favoritos: {{ totalFavoritos }}
</p>
```

---

# 📌 6. Resultado final de la parte de favoritos

Así queda el listado con los favoritos integrados:

```vue
<template>
  <p class="contador-favs">
    Favoritos: {{ totalFavoritos }}
  </p>

  <ul class="pokemon-grid">
    <li
      v-for="pokemon in pokemonsFiltrados"
      :key="pokemon.id"
      :class="{ favorito: pokemon.favorito }"
    >
      <button
        class="fav-btn"
        @click="toggleFavorito(pokemon.id)"
      >
        {{ pokemon.favorito ? '★' : '☆' }}
      </button>

      <img
        :src="pokemon.imagen"
        :alt="`imagen de ${pokemon.nombre}`"
        class="pokemon-image"
      >

      <h3>#{{ pokemon.id }} {{ pokemon.nombre }}</h3>
      <p>Tipos: {{ pokemon.tipos.join(', ') }}</p>
    </li>
  </ul>
</template>
```

Compara este listado con el del apartado 02: lo único que cambia es el botón de favorito y la clase dinámica.

---

# 🎨 Estilos recomendados

```vue
<style scoped>
.fav-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.4rem;
}

.favorito {
  border: 2px solid gold;
  border-radius: 8px;
}

.contador-favs {
  margin: 1rem 0;
  font-weight: bold;
}
</style>
```

---

# 📝 Ejercicios

1. Crea un botón que marque **todos** los pokémon como favoritos y otro que los desmarque.
2. Añade una propiedad computada que devuelva **solo los IDs** de los favoritos y muéstrala en pantalla.
3. Crea un filtro que muestre solo los pokémon cuyo nombre tenga **más de 7 letras**.
4. Añade un contador que indique **cuántos favoritos hay de cada tipo** (pista: un pokémon con dos tipos cuenta en ambos).

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[02 — Filtros y búsqueda](./02-filtros-y-busqueda.md)

⏭️ **Siguiente apartado**
[04 — Componentes, props y emits](./04-componentes-props-y-emits.md)
