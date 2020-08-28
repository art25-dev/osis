export const state = () => ({
  statistic: null
})

export const mutations = {
  changeStatistic(state, payload) {
    state.statistic = payload
  }
}

export const actions = {
  // Запрос на сервер всех пунктов навигации
  async getNavigation({ commit, dispatch }) {
    try {
      return await this.$axios.$get("/api/navigation/admin")
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на сервер одного пункта навигации
  async getNavigationItem({ commit, state }, id) {
    console.log(state.statistic);
    try {
      return await this.$axios.$get(`/api/navigation/admin/${id}`, {params: state.statistic})
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на создание пункта навигации
  async create({ commit }, { _id, title, parent, typeLink, file }) {
    try {
      const fd = new FormData()
      fd.append("_id", _id)
      fd.append("title", title)
      fd.append("parent", parent)
      fd.append("typeLink", typeLink)
      file ? fd.append("file", file, file.name) : fd.append("file", null)

      return await this.$axios.$post('/api/navigation/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на удаление пункта навигации
  async remove({ commit }, { id, pathFile }) {
    try {
      return await this.$axios.$delete(`/api/navigation/admin/${id}`, { params: { pathFile: pathFile } })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на редактирование пункта навигации
  async update({ commit }, { id, title, parent, typeLink, newFile, oldFile }) {

    try {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("parent", parent)
      fd.append("typeLink", typeLink)
      if (newFile) {
        fd.append("newFile", newFile, newFile.name)
      }
      fd.append("oldFile", oldFile)
      return await this.$axios.$put(`/api/navigation/admin/${id}`, fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }

  }
}

export const getters = {

}
