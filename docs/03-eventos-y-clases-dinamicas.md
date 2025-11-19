# 🔥 03. eventos y clases dinámicas en la pokedex

En esta tercera parte añadiremos interactividad real a la Pokedex:

* Marcar y desmarcar pokémon como **favoritos**.
* Manejar **eventos** con `@click`.
* Aplicar **clases dinámicas** en función del estado.
* Mostrar el **número total de favoritos**.

Es el primer paso hacia tener una aplicación viva: el usuario interactúa y la interfaz responde.

---

## 🎯 objetivos

Al terminar este apartado, el alumnado sabrá:

* Escuchar eventos (`@click`) y ejecutar funciones.
* Modificar propiedades dentro de elementos de un array reactivo.
* Aplicar clases dinámicas con `:class="{ ... }"`.
* Crear una `computed()` derivada del estado (contador de favoritos).

---

# 🧱 1. añadir la propiedad `favorito` a cada pokémon

En el array estático del `<script setup>` añadimos esta propiedad:

```js
favorito: false
```

Ejemplo:

```js
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
```

---

# 🧠 2. función `toggleFavorito(id)`

Creamos una función que reciba el `id` del pokémon y cambie el valor de `favorito`:

```js
const toggleFavorito = (id) => {
  const pokemon = pokemons.value.find(p => p.id === id)
  if (pokemon) {
    pokemon.favorito = !pokemon.favorito
  }
}
```

Explicación para clase:

* `find()` busca el pokémon con ese `id`.
* Al modificar `pokemon.favorito`, Vue vuelve a renderizar solo lo necesario.
* No hace falta `.value` en el template (sí en JS).

---

# 🖱️ 3. escuchar eventos con `@click`

Dentro del listado (`v-for`), añadimos un botón:

```vue
<button class="fav-btn" @click="toggleFavorito(pokemon.id)">
  {{ pokemon.favorito ? '★' : '☆' }}
</button>
```

Explicación:

* `@click` ejecuta la función cuando el usuario pulsa.
* Usamos el estado para mostrar un icono u otro.

---

# 🎨 4. clases dinámicas

Añadimos un borde dorado cuando el pokémon es favorito:

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

---

# 📊 5. contador de favoritos (`computed`)

Creamos una propiedad computada:

```js
const totalFavoritos = computed(() =>
  pokemons.value.filter(p => p.favorito).length
)
```

La mostramos encima del listado:

```vue
<p class="contador-favs">
  favoritos: {{ totalFavoritos }}
</p>
```

---

# 🧩 6. plantilla final de este bloque (extracto)

```vue
<p class="contador-favs">
  favoritos: {{ totalFavoritos }}
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
    <p>tipos: {{ pokemon.tipos.join(', ') }}</p>
  </li>
</ul>
```

---

# 📝 ejercicios

### ✔️ nivel básico

1. Cambia el icono del favorito por un corazón ❤️.
2. Cambia el borde dorado por un fondo suave (por ejemplo, amarillo claro).

### ✔️ nivel intermedio

3. Añade un botón **"mostrar solo favoritos"** usando una computed extra.
4. Crea un estilo distinto para pokémon de tipo fuego, agua, planta… usando clases dinámicas.

### ✔️ nivel avanzado

5. Añade una transición CSS para que el borde aparezca suavemente.
6. Guarda el estado de favoritos en `localStorage` para que no se pierda al recargar.

---

# ✔️ siguiente apartado: componentes (`04-componentes-basicos.md`)

En el siguiente bloque:

* Crearemos un componente `PokemonCard.vue`.
* Aprenderemos a usar `props`, `emits`, `scoped` y arquitectura Vue modular.
* Refactorizaremos la Pokedex para dejar el código limpio y escalable.
