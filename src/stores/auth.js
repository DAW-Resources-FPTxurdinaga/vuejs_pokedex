import { defineStore } from 'pinia'
import { ref } from 'vue'
import usersData from '../data/users.json'

export const useAuthStore = defineStore('auth', () => {
  // Estado: Variables que cambian
  const isAuthenticated = ref(false)
  const username = ref('')

  // Acciones: Funciones que modifican el estado
  function login(userInput, passwordInput) {
    // Buscamos el usuario en nuestro JSON
    const usuarioEncontrado = usersData.find(
      u => u.username === userInput && u.password === passwordInput
    )

    if (usuarioEncontrado) {
      isAuthenticated.value = true
      username.value = usuarioEncontrado.username
      return true
    } else {
      return false
    }
  }

  function logout() {
    isAuthenticated.value = false
    username.value = ''
  }

  return {
    isAuthenticated,
    username,
    login,
    logout
  }
})
