import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/base.css';
import './assets/fonts/Helvetica/Helvetica.css';

Vue.config.productionTip = false;

Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
