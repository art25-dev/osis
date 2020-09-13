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
  }
}

export const getters = {

}
