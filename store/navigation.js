export const state = () => ({
  statistic: {},
  currentItemNavigation: null
})

export const mutations = {
  // Создание объекта статистики
  initStatistic(state, payload) {
    for (let i = 0; i < payload.length; i++) {
      state.statistic[`${payload[i]._id}`] = 0;
    }
  },

  // Обнуление значений объекта статистика
  resetStatistic(state) {
    for (const value in state.statistic) {
      state.statistic[value] = 0
    }
  },

  // Добавление просмотра
  changeStatistic(state, payload) {
    if(payload !== state.currentItemNavigation) {
      state.statistic[payload] += 1
      state.currentItemNavigation = payload
    }

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
    try {
      return await this.$axios.$get(`/api/navigation/admin/${id}`, { params: state.statistic })
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

  },

  // Запрос на сервер статистики просмотров пунктов навигации
  async getStatistic({ commit }) {
    try {
      return await this.$axios.$get(`/api/navigation/admin/get/statistic`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}

export const getters = {

}
