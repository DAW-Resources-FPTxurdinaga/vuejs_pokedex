# 📘 Pokedex Vue — Proyecto docente

Este proyecto forma parte de una unidad didáctica para aprender **Vue 3 paso a paso** creando una **Pokedex** desde cero.

Cada apartado explica un concepto nuevo y lo aplica directamente en la aplicación. Puedes ver el resultado de cada bloque en el menú de la app (`npm run dev`) y leer la explicación en `docs/`.

> Este repositorio **no es un manual de Vue**: solo recorre lo necesario para construir la Pokedex. Para la teoría general, consulta el repositorio de apuntes de la asignatura.

---

## 🗺️ Índice de apartados

| Apartado | Tema | Vista de la app | Documentación |
|---|---|---|---|
| 00 | Creación del proyecto y estructura base | — | [Ir al apartado](docs/00-creacion-proyecto.md) |
| 01 | Conceptos básicos: interpolación, `ref`, `v-bind`, `v-for` | `/bloque1` | [Ir al apartado](docs/01-conceptos-basicos.md) |
| 02 | Búsqueda y filtros: `v-model` y `computed` | `/bloque2` | [Ir al apartado](docs/02-filtros-y-busqueda.md) |
| 03 | Eventos y clases dinámicas | `/bloque2` | [Ir al apartado](docs/03-eventos-y-clases-dinamicas.md) |
| 04 | Componentes hijos: `props`, `emits` y renderizado condicional | `/bloque3` | [Ir al apartado](docs/04-componentes-props-y-emits.md) |
| 05 | Peticiones con `fetch` | `/fetch` | [Ir al apartado](docs/05-fetch.md) |
| 06 | Peticiones con Axios | `/axios` | [Ir al apartado](docs/06-axios.md) |
| 07 | Estado global con Pinia: login | `/pinia` | [Ir al apartado](docs/07-pinia-login.md) |
| 08 | Estado global con Pinia: favoritos | `/pinia-fav` | [Ir al apartado](docs/08-pinia-favoritos.md) |
| 09 | Rutas dinámicas y vista de detalle | `/pokemon/25` | [Ir al apartado](docs/09-rutas-y-detalle.md) |

---

## ▶️ Ejecutar el proyecto

```sh
npm install
npm run dev
```

Después abre la URL que muestra Vite (por defecto `http://localhost:5173`).

---

## 🧩 Requisitos

* **Node.js** 20.19 o superior (o 22.12 o superior). Se recomienda la versión indicada en `.nvmrc` (22).
* **npm** 9 o superior.
* Navegador moderno.
* Editor recomendado: **VS Code** + extensión **Vue (Volar)**.

---

## 📁 Estructura del proyecto

```
src/
  App.vue                 → componente raíz: cabecera, menú y router-view
  main.js                 → crea la app y añade Pinia y el router
  router/index.js         → rutas de la aplicación
  views/                  → una vista por apartado (PokedexBloque1.vue, …)
  views/PokemonCard.vue   → componente hijo reutilizable (apartado 04)
  stores/                 → stores de Pinia (auth.js, pokemon.js)
  utils/api.js            → instancia de Axios (apartado 06)
  data/users.json         → usuarios de ejemplo para el login (apartado 07)
public/img/               → imágenes de los cuatro pokémon de ejemplo
docs/                     → explicaciones paso a paso
```

---

## 📄 Licencia

Uso docente.
