import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import Snotify, {SnotifyPosition} from 'vue-snotify';
import { BootstrapVue } from 'bootstrap-vue';
import {Form, Input, Button, Icon, Layout, Menu, 
        Dropdown, Avatar, PageHeader, Table, Tag, Switch,
        Tabs, Checkbox, Drawer, Row, Col, Divider,
        Statistic, Select} from 'ant-design-vue';
import { ALERT_TIMEOUT_TIME } from './general/constant';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'ant-design-vue/dist/antd.css';
import 'vue-snotify/styles/simple.css'; // Change this css for notification theme

Vue.config.productionTip = false;

// Cookie
Vue.use(VueCookies);

// Bootstrap
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
Vue.use(PageHeader);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Statistic);
Vue.use(Select)

// Notification
const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
    timeout: ALERT_TIMEOUT_TIME, // Set to 0 to disable timeout
  },
}
Vue.use(Snotify, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
