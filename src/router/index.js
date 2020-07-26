import Vue from 'vue';
import VueRouter from 'vue-router';
import Authentication from '../middlewares';
import LoginPage from '../views/Login.vue';
import DashboardPage from '../views/Dashboard.vue';

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
    component: DashboardPage,
    meta: { requiresAuth: true },
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach(Authentication);

export default router;
