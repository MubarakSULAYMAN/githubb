import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const getHeaders = () => {
  const headers = {};
  const myToken = process.env.VUE_APP_KEY;

  if (myToken) {
    headers.authorization = `Bearer ${myToken}`;
  }

  return headers;
};

const uri = process.env.VUE_APP_API_URL;
const link = new HttpLink({
  uri,
  fetch,
  headers: getHeaders(),
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
