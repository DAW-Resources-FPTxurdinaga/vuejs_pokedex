<template>
  <div class="container">
    <h2>Bloque 6: Pinia + Login</h2>

    <!-- FORMULARIO LOGIN -->
    <div v-if="!authStore.isAuthenticated">
      <h3>Acceso</h3>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Usuario (ej: ash)" />
        <input v-model="password" type="password" placeholder="Contraseña (ej: 123)" />
        <button type="submit">Entrar</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- MENSAJE BIENVENIDA -->
    <div v-else>
      <h3 class="success">¡Hola, {{ authStore.username }}!</h3>
      <p>Ya tienes acceso. Mira la barra superior para salir.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

// Usamos el store de autenticación para gestionar el estado de login
const authStore = useAuthStore()

// Variables reactivas para el formulario de login
const username = ref('')
const password = ref('')
const error = ref('')

function login() {
    // Intentamos hacer login con el store. Si falla, mostramos un error.
  if (authStore.login(username.value, password.value)) {
    // Login exitoso: limpiamos el formulario y el error
    error.value = ''
    username.value = ''
    password.value = ''
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<style scoped>
.container { padding: 2rem; max-width: 400px; margin: 0 auto; text-align: center; }
input { display: block; width: 100%; margin: 10px 0; padding: 10px; box-sizing: border-box; }
button { padding: 10px 20px; cursor: pointer; background: #333; color: white; border: none; }
.error { color: red; }
.success { color: green; }
</style>
