export const state = () => ({
  post: []
})

export const mutations = {
  // Изменение навигации и сортировка по алфавиту
  setPost(state, post) {
    state.post = post.sort((a, b) => (a.title > b.title ? 1 : -1))
  }
}

export const actions = {
  // Запрос на сервер всех объявленй
  async getPost({ commit, dispatch }) {
    try {
      const post = await this.$axios.$get("/api/post/admin")
      dispatch("setPost", post)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  // Вызов Mutation setPost
  setPost({ commit }, post) {
    commit("setPost", post)
  },

  // Запрос на создание объявления
  async create({ commit }, { title, status, file }) {
    try {
      const fd = new FormData()
      fd.append("title", title)
      fd.append("status", status)
      fd.append("file", file, file.name)

      return await this.$axios.$post('/api/post/admin', fd, { params: { pathFile: "static/posts" } })
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
  getPost: state => state.post,
  getActivePost: state => state.post.filter(item => item.status == true),
}
