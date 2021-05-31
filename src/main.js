import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/base.css';
import './assets/fonts/Helvetica/Helvetica.css';

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(VueApollo);

const getHeaders = () => {
  const headers = {};
  const token = process.env.VUE_APP_API_KEY;

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
};

// Create an http link:

const uri = process.env.VUE_APP_API_URL;
const link = new HttpLink({
  uri,
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
