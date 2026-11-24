# 🧭 09. Rutas dinámicas y vista de detalle

Hasta ahora la app tenía un menú y cada bloque era una URL fija. En este apartado vemos cómo funciona **Vue Router** por dentro, cómo crear una **ruta dinámica** (`/pokemon/:id`) y cómo leer ese parámetro para pedir los datos de un pokémon concreto.

📄 **Archivos de este apartado:**

* `src/router/index.js` → definición de las rutas.
* `src/views/PokemonDetalleView.vue` → vista de detalle que lee el `id` de la URL.
* `src/App.vue` → menú y `<router-view>` (ya explicados en el apartado 00).

🌐 **Ruta en la app:** `/pokemon/25` (o cualquier otro id, por ejemplo `/pokemon/1`).

---

## 🎯 Objetivos del apartado

* Entender cómo asocia Vue Router una URL con un componente.
* Crear una ruta con parámetros (`:id`).
* Leer el parámetro con `useRoute()`.
* Cargar datos según el parámetro y **reaccionar a cambios** de ese parámetro.
* Usar carga perezosa (`import()`) y una ruta 404.

---

# 📌 1. Definir las rutas: `src/router/index.js`

Cada ruta asocia una **URL** con un **componente**:

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PokedexBloque1 from '../views/PokedexBloque1.vue'
// ...los demás bloques...

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/bloque1', name: 'bloque1', component: PokedexBloque1 },

  // Ruta dinámica: el ":id" es un parámetro que cambia según la URL
  {
    path: '/pokemon/:id',
    name: 'pokemon-detalle',
    component: () => import('../views/PokemonDetalleView.vue')
  },

  // Ruta comodín: cualquier URL que no coincida con las anteriores
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**Ideas clave:**

* **Orden:** Vue Router prueba las rutas de arriba abajo. La ruta comodín va **siempre la última**.
* **`:id`** es un parámetro. `/pokemon/25` y `/pokemon/1` usan la misma ruta con valores distintos.
* **`() => import(...)`** es carga perezosa: el código de la vista de detalle se descarga solo cuando el usuario entra en esa ruta. Por eso en el resultado de `npm run build` aparece como un archivo aparte.
* **`createWebHistory()`** hace que las URLs sean «limpias» (sin `#`). Por eso el servidor de desarrollo de Vite necesita que todas las rutas devuelvan `index.html`, y lo hace por defecto.

---

# 📌 2. Leer el parámetro: `useRoute()`

`useRoute()` devuelve la ruta actual. Su propiedad `params` contiene los parámetros de la URL:

```js
import { useRoute } from 'vue-router'

const route = useRoute()

// Para la URL /pokemon/25:
// route.params.id  →  '25'   (siempre es un texto)
```

**Importante:** el parámetro llega como **texto**. Si necesitas un número, conviértelo.

---

# 📌 3. Cargar los datos según el parámetro

La vista pide el pokémon a la API usando el `id` de la URL:

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pokemon = ref(null)
const loading = ref(false)
const error = ref(null)

async function cargarPokemon() {
  loading.value = true
  error.value = null
  pokemon.value = null

  const id = route.params.id

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const data = await respuesta.json()

    pokemon.value = {
      id: data.id,
      nombre: data.name,
      tipos: data.types.map(t => t.type.name),
      imagen: data.sprites.other['official-artwork'].front_default,
      peso: data.weight / 10,   // la API da hectogramos → kilos
      altura: data.height / 10  // la API da decímetros → metros
    }
  } catch (err) {
    console.error('Error al cargar el pokémon:', err)
    error.value = 'No se pudo cargar la información del pokémon.'
  } finally {
    loading.value = false
  }
}

// Carga inicial y recarga cuando cambia el id de la URL
watch(
  () => route.params.id,
  () => cargarPokemon(),
  { immediate: true }
)
</script>
```

**Ideas clave:**

* `{ immediate: true }` hace que el `watch` se ejecute también la primera vez, al entrar en la página.
* `watch(() => route.params.id, ...)` vigila el parámetro. Si cambia, vuelve a pedir los datos.
* **¿Por qué no `onMounted`?** Porque Vue Router **reutiliza** el mismo componente cuando solo cambia un parámetro. `onMounted` se ejecuta una sola vez, así que al pasar de `/pokemon/25` a `/pokemon/4` seguirías viendo a Pikachu.

---

# 📌 4. La plantilla de detalle

Mostramos tres estados: cargando, error y datos.

```vue
<template>
  <div class="detalle">
    <h1>Detalle de Pokémon</h1>

    <p v-if="loading">Cargando datos del pokémon...</p>

    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else-if="pokemon" class="card">
      <img :src="pokemon.imagen" :alt="pokemon.nombre" class="pokemon-image">

      <h2>#{{ pokemon.id }} {{ pokemon.nombre }}</h2>

      <p><strong>Tipos:</strong> {{ pokemon.tipos.join(', ') }}</p>
      <p><strong>Peso:</strong> {{ pokemon.peso }} kg</p>
      <p><strong>Altura:</strong> {{ pokemon.altura }} m</p>
    </div>
  </div>
</template>
```

**Ideas clave:**

* `v-if` / `v-else-if` / `v-else` forman una cadena: solo se muestra una de las tres opciones.
* Si la API responde 404 (por ejemplo, `/pokemon/9999`), entramos en el `catch` y mostramos el mensaje de error.

---

# 📌 5. Enlazar a una ruta dinámica

Para llegar a esta vista desde otra parte de la app, usamos `<router-link>` con la URL completa:

```vue
<router-link to="/pokemon/25">09 · Rutas y detalle</router-link>
```

Si quisieras un enlace por cada pokémon de una lista, usarías el `id` del objeto:

```vue
<router-link :to="`/pokemon/${pokemon.id}`">Ver detalle</router-link>
```

---

# 🎨 Estilos

```vue
<style scoped>
.detalle {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
}

.card {
  margin-top: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.pokemon-image {
  width: 220px;
  height: 220px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.error {
  color: #b00;
  font-weight: bold;
}
</style>
```

---

# 📝 Ejercicios

1. Añade enlaces en la lista del apartado 04 (o 05) que lleven a `/pokemon/:id` de cada pokémon.
2. Prueba a escribir a mano `/pokemon/9999` en la barra del navegador. ¿Qué mensaje aparece y por qué?
3. Escribe una URL que no exista, por ejemplo `/esto-no-existe`, y comprueba que aparece la página 404.
4. Añade un botón «Anterior» y otro «Siguiente» que naveguen a `id - 1` e `id + 1` con `router.push()`. Comprueba que los datos se actualizan **sin recargar** la página. (Pista: `useRouter()` y convierte el `id` a número con `Number()`.)

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[08 — Estado global con Pinia: favoritos](./08-pinia-favoritos.md)
