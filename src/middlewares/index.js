import jwt from 'jsonwebtoken';
import Vue from 'vue';

export default function (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check jwt / permission, if not available redirect to login
    const token = window.$cookies.get(COOKIE_TOKEN);
    if (token) {
      const data = jwt.decode(token);
      const credential = {
        name: data.name,
        email: data.email,
      };
      Vue.prototype.$credential = credential;      
      next();
    }  else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
}