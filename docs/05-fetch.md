# 🌐 05. Datos de una API con `fetch`

Hasta ahora los pokémon estaban escritos a mano en el código. En este apartado los **pedimos a una API real** (PokeAPI) con `fetch`, y gestionamos los estados de carga y error.

📄 **Archivo de este apartado:** `src/views/PokedexBloque4Fetch.vue`
🌐 **Ruta en la app:** `/fetch`

---

## 🎯 Objetivos del apartado

* Hacer peticiones HTTP con la API nativa `fetch`.
* Usar `async` / `await` y `try` / `catch` / `finally`.
* Gestionar los estados **cargando**, **error** y **datos**.
* Lanzar varias peticiones a la vez con `Promise.all`.

---

## 🔌 La API que usamos

PokeAPI no requiere claves. Pedimos la lista de los 20 primeros pokémon y, después, los datos de cada uno:

```
GET https://pokeapi.co/api/v2/pokemon?limit=20      → lista (nombre + URL de detalle)
GET https://pokeapi.co/api/v2/pokemon/1             → detalle de bulbasaur
GET https://pokeapi.co/api/v2/pokemon/4             → detalle de charmander
...
```

Puedes abrir esas URL en el navegador y ver el JSON original antes de programar nada.

---

# 📌 1. Estado de la petición

Antes de llamar a la API, creamos las variables que describen su estado:

```vue
<script setup>
import { ref, computed } from 'vue'
import PokemonCard from './PokemonCard.vue'

const titulo = ref('Pokedex con VueJS + Fetch')

// La lista ya no es estática: llegará de la API
const pokemons = ref([])

// loading: hay una petición en curso
// error: mensaje si algo ha fallado
const loading = ref(false)
const error = ref(null)

// ...buscador, filtros (pokemonsFiltrados) y favoritos: ver apartados 02 y 03
</script>
```

---

# 📌 2. Función que carga los pokémon

La función hace dos cosas: pide la lista y, después, pide el detalle de cada pokémon. Usamos `try` / `catch` para los errores y `finally` para apagar el estado de carga pase lo que pase:

```vue
<script setup>
// ...

async function cargarPokemons() {
  loading.value = true
  error.value = null
  pokemons.value = []

  try {
    // 1) Petición de la lista
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')

    // fetch NO lanza error si el servidor responde 404 o 500: hay que comprobarlo
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const datos = await respuesta.json()

    // 2) Una petición por cada pokémon, todas a la vez
    const detalles = await Promise.all(
      datos.results.map(async (p) => {
        const resPokemon = await fetch(p.url)

        if (!resPokemon.ok) {
          throw new Error(`Error HTTP: ${resPokemon.status}`)
        }

        const data = await resPokemon.json()

        // Transformamos la respuesta de la API al formato que usa nuestra app
        return {
          id: data.id,
          nombre: data.name,
          tipos: data.types.map(t => t.type.name),
          imagen: data.sprites.other['official-artwork'].front_default,
          favorito: false
        }
      })
    )

    pokemons.value = detalles
  } catch (err) {
    console.error('Error al cargar los datos:', err.message)
    error.value = 'No se pudieron cargar los pokémon. Inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}
</script>
```

**Ideas clave:**

* `await fetch(...)` devuelve la **respuesta**. Para leer el cuerpo hace falta otro `await respuesta.json()`.
* `respuesta.ok` es `false` si el código HTTP es de error (4xx o 5xx). `fetch` solo falla en el `catch` si no hay conexión.
* `Promise.all` lanza todas las peticiones en paralelo y espera a que terminen todas. Si **una** falla, **todo** el bloque va al `catch`.
* `finally` se ejecuta siempre: es el sitio ideal para desactivar `loading`.

---

# 📌 3. Botón y estados en el template

El botón llama a la función y se deshabilita mientras carga. Los mensajes dependen de `loading` y `error`:

```vue
<template>
  <div class="app">
    <h1>{{ titulo }}</h1>

    <button @click="cargarPokemons" class="btn-cargar" :disabled="loading">
      {{ loading ? 'Cargando pokémon...' : 'Cargar Pokémon (Fetch)' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <ul class="pokemon-grid">
      <li v-for="pokemon in pokemonsFiltrados" :key="pokemon.id">
        <PokemonCard
          :pokemon="pokemon"
          @toggle-favorito="toggleFavorito"
        />
      </li>
    </ul>

    <p v-if="!loading && pokemonsFiltrados.length === 0" class="sin-resultados">
      No hay pokémon que coincidan con los filtros.
    </p>
  </div>
</template>
```

**Ideas clave:**

* `:disabled="loading"` evita que el usuario pulse dos veces mientras se carga.
* `v-if="!loading && ..."` evita mostrar «no hay resultados» mientras todavía estamos cargando.

---

# 📌 4. Cargar al abrir la página

Si queremos que la lista se cargue sola al entrar, llamamos a la función dentro de `onMounted`. En el archivo lo tienes comentado:

```js
import { ref, computed, onMounted } from 'vue'

onMounted(() => {
  cargarPokemons()
})
```

`onMounted` se ejecuta cuando el componente aparece en pantalla por primera vez.

---

# 🎨 Estilos

```vue
<style scoped>
.btn-cargar {
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border: none;
  background: #3a6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cargar:disabled {
  background: #999;
  cursor: not-allowed;
}

.error {
  color: #b00;
  margin-bottom: 0.5rem;
}
</style>
```

---

# 📝 Ejercicios

1. Cambia el límite a 50 pokémon y comprueba que la página sigue funcionando.
2. Activa la carga automática con `onMounted` y comprueba que el botón sigue sirviendo para recargar.
3. Simula un error: cambia la URL por una que no exista (por ejemplo, `.../pokemon-que-no-existe`) y comprueba que aparece el mensaje de error y que el botón vuelve a estar activo.
4. Muestra un contador con el número de pokémon cargados.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[04 — Componentes, props y emits](./04-componentes-props-y-emits.md)

⏭️ **Siguiente apartado**
[06 — Peticiones con Axios](./06-axios.md)
