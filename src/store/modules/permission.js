import Permission from '../../services/permission';

const initialState = () => ({
  loading: false,
  permissionList: [],
});

const state = initialState();

const getters = {};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
  setPermissionList(state, value) {
    state.permissionList = value;
  },
};

const actions = {
  loadPermission({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      Permission.list().then((resp) => {
        commit('setPermissionList', resp.data.data);
        resolve();
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        commit('setLoading', false);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};