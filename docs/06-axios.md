# 📡 06. Peticiones con Axios

En el apartado anterior hicimos las peticiones con `fetch`. Ahora hacemos lo mismo con **Axios**, una librería que simplifica las peticiones HTTP. Veremos qué cambia y cómo centralizar la configuración en una **instancia**.

📄 **Archivos de este apartado:**

* `src/utils/api.js` → instancia de Axios con la URL base.
* `src/views/PokedexBloque5Axios.vue` → la vista que usa esa instancia.

🌐 **Ruta en la app:** `/axios`

---

## 🎯 Objetivos del apartado

* Instalar y usar Axios (`npm install axios`, ya hecho en el apartado 00).
* Crear una **instancia** con `axios.create()` para reutilizar la configuración.
* Entender las diferencias entre `fetch` y Axios.
* Usar `api.get()` y leer los datos desde `respuesta.data`.

---

# 📌 1. Configurar la instancia: `src/utils/api.js`

Si todas las peticiones empiezan igual (la misma URL base, los mismos cabeceras), no hace falta repetirlas. Creamos una instancia:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
```

**Ideas clave:**

* `baseURL` se añade automáticamente. Entonces `api.get('/pokemon')` pide `https://pokeapi.co/api/v2/pokemon`.
* `timeout` cancela la petición si tarda más de 10 segundos.
* Importamos `api` en cualquier componente con `import api from '../utils/api'`.

---

# 📌 2. Pedir datos con `api.get()`

En la vista, importamos la instancia y hacemos la petición. Esta versión es la equivalente a la del apartado 05:

```vue
<script setup>
import { ref, computed } from 'vue'
import PokemonCard from './PokemonCard.vue'
import api from '../utils/api'

const pokemons = ref([])
const loading = ref(false)
const error = ref(null)

async function cargarPokemons() {
  loading.value = true
  error.value = null
  pokemons.value = []

  try {
    // 1) Lista de pokémon
    const respuesta = await api.get('/pokemon?limit=20')
    const lista = respuesta.data.results

    // 2) Detalle de cada pokémon, en paralelo
    const detalles = await Promise.all(
      lista.map(async (p) => {
        const info = await api.get(p.url)
        const data = info.data

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
    console.error('Error al cargar con Axios:', err.message)
    error.value = 'No se pudieron cargar los pokémon. Inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}
</script>
```

---

# 📌 3. Comparar `fetch` y Axios

| | `fetch` (apartado 05) | Axios (este apartado) |
|---|---|---|
| Parsear JSON | `await respuesta.json()` | Ya viene en `respuesta.data` |
| Errores HTTP 4xx / 5xx | Hay que comprobar `respuesta.ok` a mano | Se lanzan automáticamente en el `catch` |
| URL base | Hay que escribirla completa en cada petición | `baseURL` en la instancia |
| Tiempo máximo | No incluido | Opción `timeout` |

**Ideas clave:**

* Con Axios no hace falta el `if (!respuesta.ok)`: si el servidor responde con error, Axios lanza una excepción y entra en el `catch`.
* Los datos siempre están en `respuesta.data`. Es un error muy habitual escribir `respuesta.json()` con Axios.
* Ambos son válidos. Lo importante es que el resto de la app no note la diferencia: `loading`, `error` y `pokemons` funcionan igual.

---

# 🎨 Estilos

Los estilos son los mismos que en el apartado 05 (botón de carga, error y rejilla). Puedes copiarlos del archivo `PokedexBloque5Axios.vue`.

---

# 📝 Ejercicios

1. Añade a `api.js` un **interceptor** de respuesta que escriba en la consola cada petición con su URL (pista: `api.interceptors.response.use(...)`).
2. Cambia el `timeout` a 1 ms y comprueba que la petición falla y se muestra el mensaje de error.
3. Crea un segundo archivo `src/utils/pokeapi.js` con otra instancia que apunte a `https://pokeapi.co/api/v2/type` y úsala en un botón para mostrar los tipos disponibles.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[05 — Peticiones con fetch](./05-fetch.md)

⏭️ **Siguiente apartado**
[07 — Estado global con Pinia: login](./07-pinia-login.md)
