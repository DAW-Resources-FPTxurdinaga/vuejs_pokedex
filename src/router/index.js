// src/router/index.js

/* Definimos todas las rutas de la aplicación.
Cada una asocia una URL a un componente Vue dentro de /views.
*/

import { createRouter, createWebHistory } from "vue-router"

// Importamos las vistas que ya existen en tu proyecto
import PokedexBloque1 from "../views/PokedexBloque1.vue"
import PokedexBloque2 from "../views/PokedexBloque2.vue"
import PokedexBloque3 from "../views/PokedexBloque3.vue"
import PokedexBloque4Fetch from "../views/PokedexBloque4Fetch.vue"
import PokedexBloque5Axios from "../views/PokedexBloque5Axios.vue"
import PokedexBloque6Pinia from "../views/PokedexBloque6Pinia.vue"
import PokedexBloque7Pinia from "../views/PokedexBloque7Pinia.vue"

// Página de inicio y página 404 (archivos .vue, no plantillas en cadena:
// la build de Vue que usa Vite no incluye el compilador de plantillas)
import HomeView from "../views/HomeView.vue"
import NotFoundView from "../views/NotFoundView.vue"


// -------------------------------------------
// DEFINICIÓN DE RUTAS
// -------------------------------------------

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },

  // Bloques del proyecto
  { path: "/bloque1", name: "bloque1", component: PokedexBloque1 },
  { path: "/bloque2", name: "bloque2", component: PokedexBloque2 },
  { path: "/bloque3", name: "bloque3", component: PokedexBloque3 },
  { path: "/fetch",   name: "fetch",   component: PokedexBloque4Fetch },
  { path: "/axios",   name: "axios",   component: PokedexBloque5Axios },
  { path: "/pinia",   name: "pinia",   component: PokedexBloque6Pinia },
  { path: "/pinia-fav", name: "pinia-fav", component: PokedexBloque7Pinia },

  // Ruta dinámica: /pokemon/25
  // Explicación: cualquier componente puede recibir parámetros desde la URL
  {
    path: "/pokemon/:id",
    name: "pokemon-detalle",
    props: true, // envía id como prop
    component: () => import("../views/PokemonDetalleView.vue") // carga perezosa
  },

  // Ruta 404 — Para URL que no existen
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView
  }
]


// Creación del router
const router = createRouter({
  history: createWebHistory(), // Sin #
  routes
})

export default router
