import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from "./App_Botones.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router) // ← habilita Vue Router en toda la aplicación
app.mount("#app")// Monta la aplicación Vue en el elemento con id 'app' en el HTML

