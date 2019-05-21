import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '*',
      component: NotFound,  
    },
  ],
});

export default router;
