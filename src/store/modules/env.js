const state = {
  isPageLoading: false,
};
const getters = {};
const mutations = {
  setIsPageLoading(state, data) {
    state.isPageLoading = data;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
