# 🗂️ 07. Estado global con Pinia: login

Hasta ahora el estado vivía dentro de cada componente. Si varios componentes necesitan **los mismos datos**, es mejor guardarlos en un **store** de Pinia. En este apartado creamos un store de autenticación para hacer login y logout desde cualquier parte de la app.

📄 **Archivos de este apartado:**

* `src/stores/auth.js` → el store de Pinia.
* `src/data/users.json` → usuarios de ejemplo.
* `src/views/PokedexBloque6Pinia.vue` → formulario de login.
* `src/App.vue` → cabecera que muestra el usuario y el botón «Salir».

🌐 **Ruta en la app:** `/pinia`

---

## 🎯 Objetivos del apartado

* Entender qué es un store de Pinia y para qué sirve.
* Crear un store con la sintaxis de **composición** (`defineStore` con una función).
* Leer el estado y llamar a las acciones desde varios componentes.
* Distinguir **estado local** (`ref` en un componente) de **estado global** (store).

---

## 🧠 ¿Qué es un store?

Un store es un objeto **compartido** que guarda estado y funciones para modificarlo. Cualquier componente que lo use ve los mismos datos:

```
auth store
  ├── isAuthenticated  (estado)
  ├── username         (estado)
  ├── login()          (acción)
  └── logout()         (acción)

PokedexBloque6Pinia.vue  ──┐
App.vue (cabecera)       ──┴── usan el mismo store
```

Cuando el formulario hace `login`, la cabecera de `App.vue` se actualiza sola, sin que tengan que comunicarse entre ellos.

---

# 📌 1. Datos de ejemplo: `src/data/users.json`

Para el login usamos una lista fija de usuarios:

```json
[
  { "username": "ash", "password": "123" },
  { "username": "misty", "password": "456" },
  { "username": "brock", "password": "789" }
]
```

> ⚠️ **Advertencia:** este login es **solo didáctico**. Las contraseñas están en texto plano dentro del código, cualquiera puede verlas y no hay servidor que las compruebe. En una aplicación real **nunca** se hace así: la comprobación se hace en un servidor y las contraseñas se guardan cifradas.

---

# 📌 2. El store: `src/stores/auth.js`

Creamos el store con `defineStore`. El primer parámetro es un **nombre único** y el segundo es una función que devuelve lo que el store expone:

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import usersData from '../data/users.json'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const isAuthenticated = ref(false)
  const username = ref('')

  // Acciones
  function login(userInput, passwordInput) {
    const usuarioEncontrado = usersData.find(
      u => u.username === userInput && u.password === passwordInput
    )

    if (usuarioEncontrado) {
      isAuthenticated.value = true
      username.value = usuarioEncontrado.username
      return true
    } else {
      return false
    }
  }

  function logout() {
    isAuthenticated.value = false
    username.value = ''
  }

  // Todo lo que se devuelve está disponible para los componentes
  return {
    isAuthenticated,
    username,
    login,
    logout
  }
})
```

**Ideas clave:**

* Dentro del store, el estado se escribe con `ref` igual que en un componente.
* `login` devuelve `true` o `false`: así el componente decide qué mostrar.
* Lo que **no** se devuelve en el `return` queda privado.

---

# 📌 3. Usar el store en un componente

Para usar el store, llamamos a la función `useAuthStore()`. Así obtenemos el mismo objeto desde cualquier componente:

```vue
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

function login() {
  if (authStore.login(username.value, password.value)) {
    // Login correcto: limpiamos el formulario
    error.value = ''
    username.value = ''
    password.value = ''
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<template>
  <div v-if="!authStore.isAuthenticated">
    <h3>Acceso</h3>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Usuario (ej: ash)" />
      <input v-model="password" type="password" placeholder="Contraseña (ej: 123)" />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>

  <div v-else>
    <h3 class="success">¡Hola, {{ authStore.username }}!</h3>
    <p>Ya tienes acceso. Mira la barra superior para salir.</p>
  </div>
</template>
```

**Ideas clave:**

* `username` y `password` son estado **local**: solo los necesita el formulario.
* `authStore.isAuthenticated` es estado **global**: lo necesita también la cabecera.
* `@submit.prevent` evita que el navegador recargue la página al enviar el formulario.

---

# 📌 4. Mostrar el usuario en la cabecera: `App.vue`

La cabecera usa el mismo store. Solo muestra el usuario y el botón de salir cuando hay sesión iniciada:

```vue
<script setup>
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="user-info">
    <span>Usuario: <strong>{{ authStore.username }}</strong></span>
    <button @click="authStore.logout()">Salir</button>
  </div>
</template>
```

Prueba esto: inicia sesión en `/pinia`, cambia de ruta con el menú y comprueba que el usuario sigue apareciendo en la cabecera. Después pulsa «Salir».

---

# 🎨 Estilos

```vue
<style scoped>
.container {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background: #333;
  color: white;
  border: none;
}

.error { color: red; }
.success { color: green; }
</style>
```

---

# 📝 Ejercicios

1. Añade un cuarto usuario a `users.json` y comprueba que puedes entrar con él.
2. Muestra en el formulario un mensaje de error distinto si el usuario **no existe** y si la **contraseña** es incorrecta (pista: el store tendría que devolver más información que `true` o `false`).
3. Haz que el store muestre un mensaje de bienvenida diferente según el usuario (por ejemplo, con una propiedad computada `saludo`).
4. Investiga qué pasa con el login si recargas la página. ¿Por qué ocurre? (Pista: el store vive en memoria.)

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏮️ **Apartado anterior**
[06 — Peticiones con Axios](./06-axios.md)

⏭️ **Siguiente apartado**
[08 — Estado global con Pinia: favoritos](./08-pinia-favoritos.md)
