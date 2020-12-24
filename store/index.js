export const state = () => ({
  error: null
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
}

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('Message received', data)
  }
}


export const getters = {
  error: state => state.error
}
