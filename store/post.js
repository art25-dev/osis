export const state = () => ({

})

export const mutations = {

}

export const actions = {
  // Запрос на сервер всех объявленй
  async getPost({ commit, dispatch }) {
    try {
      return await this.$axios.$get("/api/post/admin")
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на создание объявления
  async create({ commit }, { title, status, file }) {
    console.log(title);
    console.log(status);
    console.log(file);
    try {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("status", status)
      fd.append("file", file, file.name)
      // file ? fd.append("file", file, file.name) : fd.append("file", null)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на удаление пункта навигации
  async remove({ commit }, { id, pathFile }) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`, { params: { pathFile: pathFile } })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },


}

export const getters = {

}
