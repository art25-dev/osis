export const state = () => ({
  token: null
})

export const mutations = {
  // Изменение значение токена
  setToken(state, token) {
    state.token = token
  },
  // Очистка токена в state
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  // Отправка объекта с данными формы на сервер
  async login({ commit, dispatch }, formData) {
    try {
      const token = await this.$axios.$post("/api/auth/admin/login", formData)
      dispatch("setToken", token)
    } catch (e) {
      commit("setError", e, { root: true })
      throw e
    }

  },
  // Вызов Mutation setToken
  setToken({ commit }, token) {
    commit("setToken", token)
  },
  // Вызов Mutation clearToken
  logout({ commit }) {
    commit("clearToken")
  }
}

export const getters = {
  isAuth: state => state.token
}
