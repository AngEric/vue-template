import Vue from 'vue';
import VueRouter from 'vue-router';
import Authentication from '../middlewares';
import LoginPage from '../views/PageLogin.vue';
import HomePage from '../views/PageHome.vue';
import DashboardPage from '../views/PageDashboard.vue';
import GameListPage from '../views/PageGameList.vue';
import UserListPage from '../views/PageUserList.vue';
import BroadcastPage from '../views/PageBroadcast.vue';
import SettingPage from '../views/PageSetting.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomePage,
    meta: { requiresAuth: true },
    redirect: { name: 'index'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: DashboardPage,
      },
      {
        path: 'game',
        name: 'game',
        component: GameListPage,
      },
      {
        path: 'user',
        name: 'user',
        component: UserListPage,
      },
      {
        path: 'broadcast',
        name: 'broadcast',
        component: BroadcastPage,
      },
      {
        path: 'setting',
        name: 'setting',
        component: SettingPage,
      },
    ],
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(Authentication);

export default router;
