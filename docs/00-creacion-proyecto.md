# 🧱 00. Creación del proyecto y estructura base

En este apartado creamos el proyecto desde cero con Vite, instalamos las dependencias que usaremos en la Pokedex y dejamos preparada la estructura sobre la que trabajaremos en el resto de apartados.

---

## 🎯 Objetivos

* Crear un proyecto Vue 3 con `create-vue`.
* Instalar Vue Router, Pinia y Axios.
* Entender qué hacen `main.js` y `App.vue`.
* Ejecutar la aplicación en local.

---

## 📋 Requisitos previos

* Node.js 20.19 o superior (o 22.12 o superior). En este repositorio usamos la versión 22 (ver `.nvmrc`).
* npm 9 o superior.

Comprueba las versiones:

```sh
node -v
npm -v
```

---

# 📌 1. Crear el proyecto

Desde la carpeta donde guardas tus proyectos, ejecuta:

```sh
npm create vue@latest pokedex-vue
```

El asistente te preguntará por las opciones. Para este curso elige:

| Pregunta | Respuesta |
|---|---|
| Add TypeScript? | No |
| Add JSX Support? | No |
| Add Vue Router for Single Page Application development? | **Sí** |
| Add Pinia for state management? | **Sí** |
| Add Vitest for Unit Testing? | No |
| Add an End-to-End Testing Solution? | No |
| Add ESLint for code quality? | No |
| Add Prettier for code formatting? | No |

Después entra en la carpeta, instala las dependencias y añade Axios:

```sh
cd pokedex-vue
npm install
npm install axios
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

---

# 📌 2. Preparar las imágenes

Los pokémon de los ejemplos usan imágenes locales que están en el repositorio, en la carpeta `public/img/`.

Copia esa carpeta dentro de `public/` de tu proyecto para que quede así:

```
public/
  favicon.ico
  img/
    bulbasaur.png
    charmander.png
    squirtle.png
    pikachu.png
```

Todo lo que está en `public/` se sirve tal cual. Por eso en el código usamos rutas que empiezan por `/img/`.

---

# 📌 3. Estructura base

Dentro de `src/` vas a encontrar esta estructura mínima:

```
src/
  main.js        → punto de entrada de la aplicación
  App.vue        → componente raíz
  router/        → rutas de la aplicación (index.js)
  stores/        → stores de Pinia
  views/         → una vista por apartado
  components/    → componentes reutilizables
```

Borra los archivos de ejemplo que trae `create-vue` que no usaremos (`src/views/AboutView.vue`, `src/components/`, `src/assets/`). La página de inicio (`src/views/HomeView.vue`) la sustituyes por la versión del repositorio, y el resto de vistas las irás creando en cada apartado.

---

## `main.js`

Es el archivo que crea la aplicación, le añade los plugins y la monta en el HTML:

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())  // estado global (apartados 07 y 08)
app.use(router)         // navegación entre bloques (apartado 09)
app.mount('#app')
```

---

## `App.vue`

Es el componente raíz. Lo que se ve en todas las páginas: la cabecera, el menú y la vista activa.

```vue
<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>Pokedex con Vue</h1>

      <nav class="menu">
        <router-link to="/">🏠 Inicio</router-link>
        <router-link to="/bloque1">01 · Conceptos básicos</router-link>
        <!-- ...un enlace por cada apartado... -->
      </nav>
    </header>

    <main class="contenido">
      <!-- Aquí se muestra la vista de la ruta activa -->
      <router-view />
    </main>
  </div>
</template>
```

Dos ideas clave:

* `<router-link>` cambia de página **sin recargar** el navegador.
* `<router-view>` es el hueco donde Vue Router pinta la vista que corresponde a la URL.

La versión completa de `App.vue` (con su menú y sus estilos) está en el repositorio.

---

# 📌 4. Comprobar la estructura

Cuando termines, deberías poder:

1. Ejecutar `npm run dev` sin errores.
2. Ver la cabecera con el menú en el navegador.
3. Ver la página de inicio al entrar en `/`.

Si ves una página en blanco, revisa la consola del navegador: casi siempre es un error de importación en `main.js` o en `router/index.js`.

---

# 📝 Ejercicios

1. Cambia el título de la cabecera por tu propio nombre de Pokedex.
2. Añade un enlace nuevo al menú de `App.vue` que apunte a una ruta que todavía no existe. Comprueba qué pasa al pulsarlo (verás la página 404).
3. Crea un archivo `src/views/PruebaView.vue` con un `<h2>` y regístralo en `src/router/index.js` con la ruta `/prueba`. Comprueba que aparece al escribir `/prueba` en la barra del navegador.

---

# 🔗 Enlaces

🔙 **Volver al índice general**
[Ir al README](../README.md)

⏭️ **Siguiente apartado**
[01 — Conceptos básicos](./01-conceptos-basicos.md)
