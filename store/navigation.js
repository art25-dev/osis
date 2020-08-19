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
  async getMenu({ commit, dispatch }) {
    try {
      const navigation = await this.$axios.$get("/api/navigation")
      return navigation
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },


  // Запрос на создание подразделения
  async create({ commit }, {_id, title, parent, typeLink, file}) {
    try {
      const fd = new FormData()

      console.log(_id);
      console.log(title);
      console.log(parent);
      console.log(typeLink);
      console.log(file);
      
      fd.append("_id", _id)
      fd.append("title", title)
      fd.append("parent", parent)
      fd.append("typeLink", typeLink)
      if(file) {
        fd.append("file", file, file.name)
      } else {
        fd.append("file", null)
      }


      return await this.$axios.$post('/api/navigation/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на удаление подразделения
  async remove({ commit }, {id, pathFile}) {
    try {
      return await this.$axios.$delete(`/api/navigation/admin/${id}`, { params: { pathFile: pathFile } })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Запрос на редактирование подразделения
  async update({ commit }, formData) {
    try {
      return await this.$axios.$put(`/api/navigation/admin/${formData._id}`, formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }

  },



  // Запрос на сервер одного подразделения
  async fetchAdminById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/navigation/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {

}
