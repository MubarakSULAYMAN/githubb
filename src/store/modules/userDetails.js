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

      commit('SET_USER_DETAILS', userDetails);
      commit('SET_AVATAR_URL', userDetails.avatarUrl);
      commit('SET_USER_LOADING', response.loading);
    } catch (err) {
      dispatch('updateErrorMessage', err);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
