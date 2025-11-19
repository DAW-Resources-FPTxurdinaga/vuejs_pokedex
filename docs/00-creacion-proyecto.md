# 🧱 00. Creación del proyecto y estructura base

En este apartado vamos a crear el proyecto Vue 3 con Vite y a revisar la estructura mínima con la que vamos a trabajar.
Este será el punto de partida para construir la Pokedex paso a paso.

---

## 🎯 Objetivos

* Crear un proyecto Vue 3 usando Vite.
* Entender qué hacen `main.js` y `App.vue`.
* Ejecutar el proyecto en local y confirmar que funciona.
* Dejar todo preparado para comenzar con los conceptos básicos de Vue.

---

# 📌 1. Crear el proyecto

Vamos a generar un nuevo proyecto llamado `pokedex-vue`:

```bash
npm create vue@latest pokedex-vue
cd pokedex-vue
npm install
npm run dev
```

Después de ejecutar `npm run dev`, podrás abrir el proyecto en el navegador y ver la plantilla inicial de Vue.

---

# 📌 2. Estructura mínima

Dentro de `src/` encontrarás la estructura base:

```
src/
  main.js     → punto de entrada de la aplicación
  App.vue     → componente raíz
```

### `main.js`

Es el archivo que crea la aplicación y monta el componente principal:

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### `App.vue`

Es el componente raíz. De momento, mostraremos un contenido muy sencillo:

```vue
<template>
  <div class="app">
    <h1>Pokedex Vue</h1>
    <p>Primer proyecto con Vue 3</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
```

En los siguientes apartados iremos transformando este componente para convertirlo en la Pokedex.

---

# 📝 Ejercicios

Realiza estos ejercicios para asegurarte de que entiendes la estructura básica del proyecto:

1. Crea un valor reactivo sencillo (por ejemplo, un texto) y muéstralo en la plantilla.
2. Añade un botón que modifique ese valor cuando lo pulses.
3. Crea un segundo componente `.vue` en la carpeta `src/` y muéstralo en `App.vue`.
4. Añade una sección nueva en el template usando etiquetas HTML y comprueba que se muestra correctamente.
5. Crea una variable reactiva que contenga un número y muestra ese número incrementándose cada vez que pulses un botón.

Estos ejercicios te ayudarán a practicar la estructura y a confirmar que todo funciona antes de avanzar.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏭️ **Siguiente apartado**
[01 — Conceptos básicos](./01-conceptos-basicos.md)
