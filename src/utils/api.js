// src/utils/api.js
import axios from "axios"

/*
  Creamos una instancia de Axios configurada con una base URL.
  Esto nos permite hacer peticiones más limpias y reutilizables.
*/

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

export default api
