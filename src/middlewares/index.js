export default function (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check jwt / permission, if not available redirect to login
    if (window.$cookies.get(COOKIE_TOKEN)) {
      next();
    }  else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
}