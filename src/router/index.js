import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Users from '../views/pages/Users.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/home',
    redirect: '/',
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },

  {
    path: '/:username',
    name: 'Users',
    component: Users,
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('../views/pages/PageNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// TODO: Catch all wrong matching routed
// router.resolve({
//   name: 'PageNotFound',
//   // params: { pathMatch: ['(/)MubarakSULAYMAN?tab=repositories(/)', ''] },
// }).href;

export default router;
