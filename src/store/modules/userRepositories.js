import gql from 'graphql-tag';
import graphqlClient from '@/utils/services/graphql';

const state = {};

const mutations = {};

const actions = {
  async fetchRepos({ commit, dispatch, rootState }) {
    try {
      const response = await graphqlClient.query({
        query: gql`
        query getRepos($username: String!) {
          userRepos: user(login: $username) {
            repositories(
              first: 20
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                name
                description
                url
                updatedAt
                forkCount
                stargazerCount
                licenseInfo {
                  name
                }
                primaryLanguage {
                  name
                  color
                }
                isPrivate
                isFork
                parent {
                  name
                  url
                }
                repositoryTopics(first: 30) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,

        variables: {
          username: rootState.username,
        },
      });

      const repos = response.data.userRepos;

      commit('SET_REPOS', repos);
      commit('SET_TOTAL_REPO', repos.repositories.totalCount);
      commit('SET_REPOS_LOADING', response.loading);
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
