const initialState = () => ({
  loading: false,
  opened: false,
});

const state = initialState();

const getters = {};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
  handleDrawer(state, value) {
    state.opened = value;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};