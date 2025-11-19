
# 🧱 0. creación del proyecto y estructura base

En este apartado dejamos preparada la base del proyecto sobre la que construiremos nuestra Pokedex.

---

## 🎯 objetivos

* Crear un proyecto Vue 3 con Vite.
* Entender la estructura básica (`main.js`, `App.vue`).
* Ejecutar el proyecto en local.
* Dejar todo listo para empezar con los fundamentos de Vue.

---

## 🚀 1. crear el proyecto

```bash
npm create vue@latest pokedex-vue
cd pokedex-vue
npm install
npm run dev
```

---

## 📁 2. estructura mínima

```
src/
  main.js     → punto de entrada
  App.vue     → componente raíz
```

### main.js

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### App.vue

```vue
<template>
  <div class="app">
    <h1>pokedex vue</h1>
    <p>primer proyecto con vue 3</p>
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

---

## 📝 ejercicio

1. Cambia el título por uno personalizado.
2. Añade tu nombre o grupo.
3. Cambia algún estilo.

---

## ✔️ siguiente apartado

Ve a:
**`docs/01-conceptos-basicos.md`**
