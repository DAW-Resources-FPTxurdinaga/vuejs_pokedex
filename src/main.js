import { createApp } from 'vue'
import App from "./App_Botones.vue"
import router from "./router"

createApp(App)
  .use(router) // ← habilita Vue Router en toda la aplicación
  .mount("#app")// Monta la aplicación Vue en el elemento con id 'app' en el HTML

