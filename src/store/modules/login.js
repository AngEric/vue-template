import helper from '../../general/helper';
import { EXPIRE_TIME } from '../../general/constant';

const initialState = () => ({
  loading: false,
  domain: helper.setDomain(window.location.hostname),
});

const state = initialState();

const getters = {
  isLogin() {
    return window.$cookies.get(COOKIE_TOKEN) ? true : false;
  },
};

const mutations = {
  setLoading(state, value) {
    state.loading = value;
  },
};

const actions = {
  login({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        // Replace with JWT response
        commit('setLoading', true);
        const tempToken = 'tokenabc';
        const domain = state.domain;
        const expire = new Date(new Date().getTime() + EXPIRE_TIME).toUTCString();
        const secureCookie = COOKIE_SECURE === 'true' ? true : false;
        window.$cookies.set(COOKIE_TOKEN, tempToken, expire, null, domain, secureCookie);
        // Remove this part to finally when using axios
        commit('setLoading', false);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
  logout({ state }) {
    const domain = state.domain;
    window.$cookies.remove(COOKIE_TOKEN, null, domain);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};