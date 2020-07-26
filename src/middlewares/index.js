export default function (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check jwt / permission, if not available redirect to login
    next({ path: '/login' });
  } else {
    next();
  }
}