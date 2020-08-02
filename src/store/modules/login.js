import helper from '../../general/helper';
import jwt from 'jsonwebtoken';
import Auth from '../../services/auth';
import Vue from 'vue';

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
  login({ commit, state }, options) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      Auth.login(options).then((resp) => {
        const token = resp.data.data.token;
        const credentialData = jwt.decode(token);
        const domain = state.domain;
        const expire = new Date(credentialData.exp * 1000);
        const secureCookie = COOKIE_SECURE === 'true' ? true : false;
        
        // Use this for local or deployed environment
        window.$cookies.set(COOKIE_TOKEN, token, expire, null, domain, secureCookie);
        
        // Use this if you want to test in same wifi network
        // window.$cookies.set(COOKIE_TOKEN, token, expire);

        const credential = {
          name: credentialData.name,
          email: credentialData.email,
        };
        Vue.prototype.$credential = credential;

        resolve();
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        commit('setLoading', false);
      });
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