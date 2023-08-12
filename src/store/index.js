import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if(localStorage.getItem('Authorization')) {
        state.token = localStorage.getItem('Authorization')
        state.isAuthenticated = true
      }else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
