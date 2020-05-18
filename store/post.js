export const state = () => ({

})

export const mutations = {

}

export const actions = {
  // Запрос на сервер всех объявлений
  async fetchAdmin({ commit }) {
    try {
      return await this.$axios.$get("/api/post/admin")
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на удаление объявления
  async remove({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на редактирование объявления
  async update({ commit }, { id, title, text, status }) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {title, text, status})
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на создание объявления
  async create({ commit }, formData) {
    try {
      return await this.$axios.$post('/api/post/admin', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на сервер одного объявления
  async fetchAdminById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {

}
