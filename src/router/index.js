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

// Vista opcional — Página de inicio muy simple
const HomeView = {
  template: `
    <div style="padding:2rem">
      <h1>📘 Proyecto Pokedex Vue</h1>
      <p>Elige uno de los bloques para ver el ejemplo correspondiente.</p>
    </div>
  `
}


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
    component: {
      template: `<h2 style="padding:2rem;color:red">Página no encontrada (404)</h2>`
    }
  }
]


// Creación del router
const router = createRouter({
  history: createWebHistory(), // Sin #
  routes
})

export default router
