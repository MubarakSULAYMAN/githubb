import gql from 'graphql-tag';
import graphqlClient from '@/utils/services/graphql';

const state = {};

const mutations = {};

const actions = {
  async fetchUserDetails({ commit, dispatch, rootState }) {
    try {
      const response = await graphqlClient.query({
        query: gql`
          query getUser($username: String!) {
            user(login: $username) {
              login
              name
              company
              avatarUrl
              bio
              email
              followers {
                totalCount
              }
              following {
                totalCount
              }
              starredRepositories {
                totalCount
              }
              location
              twitterUsername
              websiteUrl
            }
          }
        `,

        variables: {
          username: rootState.username,
        },
      });

      const userDetails = response.data.user;
      console.log('response.request');

      commit('SET_USER_DETAILS', userDetails);
      commit('SET_AVATAR_URL', userDetails.avatarUrl);
      commit('SET_USER_LOADING', response.loading);
      console.log('response.request');
    } catch (e) {
      // console.log(e);
      commit('SET_USER_ERROR', e);
      dispatch('updateErrorMessage', e);

      // TODO: Enhance error catching
      // Error: Network error: NetworkError when attempting to fetch resource.
      // Error: Network error: Response not successful: Received status code 401
      // Error: GraphQL error: Could not resolve to a User with the login of 'GeekyAdamz'.

      // const noInternet = 'NetworkError when attempting to fetch resource';
      // const internalError = 'Received status code 401';
      // const invalidLogin = 'Could not resolve to a User';

      // if (e.includes(noInternet)) {
      //   dispatch('updateErrorMessage', 'Kindly check and fix your internet to proceed.');
      // } else if (e.includes(internalError)) {
      //   dispatch('updateErrorMessage', 'Internal Error, it should reolve soon.');
      // } else if (e.includes(invalidLogin)) {
      //   dispatch('updateErrorMessage', 'Try later, user does not exist.');
      // } else {
      //   dispatch('updateErrorMessage');
      // }
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
