import Role from '../../services/role';

const initialState = () => ({
  loading: false,
  opened: false,
  roleList: [],
});

const state = initialState();

const getters = {};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
  handleDrawer(state, value) {
    state.opened = value;
  },
  setRoleList(state, value) {
    state.roleList = value;
  },
};

const actions = {
  loadRole({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      Role.list().then((resp) => {
        commit('setRoleList', resp.data.data);
        resolve();
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        commit('setLoading', false);
      });
    });
  },
  addRole({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      Role.create(data).then((resp) => {
        commit('setRoleList', resp.data.data);
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        commit('setLoading', false);
      });
    });
  },
  updateStatus({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      Role.updateStatus(data).then((resp) => {
        commit('setRoleList', resp.data.data);
        resolve(resp.data);
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