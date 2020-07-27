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

  // Запрос на создание объявления 1
  // async create({ commit }, formData) {
  //   try {
  //     console.log(formData);
  //     return await this.$axios.$post('/api/post/admin', formData)
  //   } catch (e) {
  //     commit('setError', e, { root: true })
  //     throw e
  //   }
  // },

    // Запрос на создание объявления 2
    async create({ commit }, { title, text, department, status, imageList}) {
      try {

        const fd = new FormData()
        fd.append("title", title)
        fd.append("text", text)
        fd.append("department", department)
        fd.append("status", status)
      
        for (let i = 0; i < imageList.length; i++) {
          fd.append("imageList", imageList[i], imageList[i].name)
        }
        return await this.$axios.$post('/api/post/admin', fd)
       
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
