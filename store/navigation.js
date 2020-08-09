export const state = () => ({

})

export const mutations = {

}

export const actions = {
  // Запрос на сервер всех пунктов меню (панель администратора)
  async fetchAdmin({ commit }) {
    try {
      return await this.$axios.$get("/api/navigation/admin")
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на сервер пунктов меню
  async getMenu({ commit }) {
    try {
      return await this.$axios.$get("/api/navigation")
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на создание подразделения
  async create({ commit }, formData) {
    try {
      return await this.$axios.$post('/api/navigation/admin', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на удаление подразделения
  async remove({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/navigation/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на редактирование подразделения
  // async update({ commit }, { id, title, newImageFile, pathOldImage }) {
  //   try {
  //     const fd = new FormData()
  //     fd.append("title", title)
  //     if (newImageFile) {
  //       fd.append("newImageFile", newImageFile, newImageFile.name)
  //     }
  //     fd.append("pathOldImage", pathOldImage)

  //     return await this.$axios.$put(`/api/department/admin/${id}`, fd)
  //   } catch (e) {
  //     commit('setError', e, { root: true })
  //     throw e
  //   }

  // },



  // Запрос на сервер одного подразделения
  // async fetchAdminById({ commit }, id) {
  //   try {
  //     return await this.$axios.$get(`/api/department/admin/${id}`)
  //   } catch (e) {
  //     commit('setError', e, { root: true })
  //     throw e
  //   }
  // }
}

export const getters = {
  GET_MENU() {
    console.log(state);
  }

}
