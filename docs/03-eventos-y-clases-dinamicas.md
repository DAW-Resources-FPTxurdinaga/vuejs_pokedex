# 🔥 03. Eventos y clases dinámicas en la Pokedex

En este apartado vas a añadir interactividad real a la Pokedex.
Aprenderás a escuchar eventos, modificar el estado de los pokémon y aplicar estilos de forma dinámica en función de ese estado.

---

## 🎯 Objetivos del apartado

* Escuchar eventos del usuario con `@click`.
* Modificar propiedades dentro de un array reactivo.
* Aplicar clases dinámicas usando `:class="{ … }"`.
* Crear una propiedad computada que derive información del estado (número de favoritos).

---

# 📌 1. Añadir la propiedad `favorito` a cada pokémon

Para poder marcar pokémon como favoritos, primero necesitas incluir esta propiedad dentro del array inicial.
Esto permite que cada pokémon tenga su propio estado visual.

```vue
<script setup>
import { ref } from 'vue'

const pokemons = ref([
  {
    id: 1,
    nombre: 'bulbasaur',
    tipos: ['planta', 'veneno'],
    imagen: '/img/bulbasaur.png',
    favorito: false
  },
  {
    id: 4,
    nombre: 'charmander',
    tipos: ['fuego'],
    imagen: '/img/charmander.png',
    favorito: false
  },
  {
    id: 7,
    nombre: 'squirtle',
    tipos: ['agua'],
    imagen: '/img/squirtle.png',
    favorito: false
  },
  {
    id: 25,
    nombre: 'pikachu',
    tipos: ['eléctrico'],
    imagen: '/img/pikachu.png',
    favorito: false
  }
])
</script>
```

---

# 📌 2. Crear la función `toggleFavorito(id)`

Ahora vas a crear una función que cambie el valor de `favorito` de un pokémon cada vez que se pulse un botón.
Esto te permitirá alternar entre marcado y desmarcado.

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
* Cambiar `pokemon.favorito` actualiza automáticamente la interfaz.
* En el template no necesitas `.value`.

---

# 📌 3. Escuchar eventos con `@click`

Dentro del listado, vas a añadir un botón que permita marcar o desmarcar cada pokémon.

```vue
<button
  class="fav-btn"
  @click="toggleFavorito(pokemon.id)"
>
  {{ pokemon.favorito ? '★' : '☆' }}
</button>
```

Esto te permite:

* Ejecutar la función cuando el usuario interactúa.
* Mostrar un icono distinto según el estado del pokémon.

---

# 📌 4. Aplicar clases dinámicas

Para resaltar los favoritos, puedes añadir una clase solo cuando `pokemon.favorito` sea `true`.

```vue
<li
  v-for="pokemon in pokemonsFiltrados"
  :key="pokemon.id"
  :class="{ favorito: pokemon.favorito }"
>
```

En los estilos:

```css
.favorito {
  border: 2px solid gold;
  border-radius: 8px;
}
```

Las clases dinámicas te permiten adaptar la interfaz según los datos sin duplicar HTML.

---

# 📌 5. Crear un contador de favoritos (computed)

Vas a crear una propiedad computada que calcule cuántos pokémon están marcados como favoritos.

```vue
<script setup>
// ...

const totalFavoritos = computed(() =>
  pokemons.value.filter(p => p.favorito).length
)
</script>
```

Y lo muestras en el template:

```vue
<p class="contador-favs">
  Favoritos: {{ totalFavoritos }}
</p>
```

---

# 📌 6. Resultado final integrado

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

---

# 🎨 Estilos recomendados

```vue
<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}

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

1. Crea un botón que permita marcar **todos** los pokémon como favoritos y otro que los desmarque.

2. Añade una propiedad computada que devuelva **solo los IDs** de los pokémon favoritos y muéstrala en pantalla.

3. Crea un filtro adicional que permita mostrar solo los pokémon cuyo nombre **tenga más de 7 letras**.

4. Añade un contador que indique **cuántos favoritos hay de cada tipo**.

5. Haz que el estilo de favorito se active **mediante una transición de Vue**, no solo CSS.

---

Si quieres, ahora adapto también los ejercicios de los bloques 01 y 02 para que cumplan esta misma norma estricta.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏭️ **Siguiente apartado**
[04 — Componentes básicos](./04-componentes-basicos.md)
