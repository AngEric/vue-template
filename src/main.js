import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import {Form, Input, Button, Icon, Layout, Menu, Dropdown, Avatar} from 'ant-design-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// Antd Component
Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Avatar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
