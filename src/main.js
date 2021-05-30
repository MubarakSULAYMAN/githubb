import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/base.css';
import './assets/fonts/Helvetica/Helvetica.css';
// import detectDeviceMixin from './mixins/detectDeviceMixin';
// import VueMeta from 'vue-meta';

Vue.config.productionTip = false;

// Vue.mixin(detectDeviceMixin);
// Vue.use(VueMeta);
Vue.use(VueApollo);

const getHeaders = () => {
  const headers = {};
  // const token = window.localStorage.getItem('apollo-token');
  const token = process.env.VUE_APP_API_KEY;
  // const token = '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';

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
};

// Create an http link:

const uri = process.env.VUE_APP_API_URL;
const link = new HttpLink({
  uri,
  // uri: 'https://api.github.com/graphql',
  fetch,
  headers: getHeaders(),
});

const client = new ApolloClient({
  link,

  cache: new InMemoryCache({
    addTypename: true,
  }),
});

const apolloProvider = new VueApollo({

  defaultClient: client,

});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
