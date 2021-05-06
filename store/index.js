export const state = () => ({
  openModals: []
})

export const mutations = {
  CLOSE_ALL_MODALS(state) {
    state.openModals = [];
  },
  CLOSE_MODAL(state, modal) {
    state.openModals = state.openModals.filter(m => m !== modal);
  },
  OPEN_MODAL(state, modal) {
    state.openModals.push(modal);
  },
}

export const actions = {
  toggleModal({ commit, state }, modal) {
    if (state.openModals.includes(modal)) commit("CLOSE_MODAL", modal)
    else commmit("OPEN_MODAL", modal);
  },
}
