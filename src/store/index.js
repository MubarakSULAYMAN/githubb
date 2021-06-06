import Vue from 'vue';
import Vuex from 'vuex';
import userDetails from './modules/userDetails';
import userRepositories from './modules/userRepositories';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStarting: false,
    selectedTab: 'Repositories',
    name: 'Mubarak SULAYMAN',
    username: 'MubarakSULAYMAN',
    avatarUrl: '',
    showAvatar: false,
    user: [],
    userRepos: [],
    repoTotalCount: 0,
    userLoading: true,
    userReposLoading: true,
    isError: false,
    userError: null,
    ReposError: null,
    errorMessage: 'An error just occured. It should resolve soon.',
  },

  getters: {
  },

  mutations: {
    SET_NAME(state, newName) {
      state.name = newName;
    },

    SET_USERNAME(state, newUsername) {
      state.username = newUsername;
    },

    SET_USER_DETAILS(state, data) {
      state.user = data;
    },

    SET_USER_LOADING(state, newState) {
      state.userLoading = newState;
    },

    SET_USER_ERROR(state, data) {
      state.userError = data;
    },

    SET_REPOS(state, data) {
      state.userRepos = data;
    },

    SET_REPOS_LOADING(state, newState) {
      state.userReposLoading = newState;
    },

    SET_REPOS_ERROR(state, data) {
      state.reposError = data;
    },

    SET_AVATAR_URL(state, newUrl) {
      state.avatarUrl = newUrl;
    },

    SET_AVATAR_STATUS(state, newStatus) {
      state.showAvatar = newStatus;
    },

    SET_TOTAL_REPO(state, totalCount) {
      state.repoTotalCount = totalCount;
    },

    // TODO: Catch all error as required
    SET_ERROR_STATE(state, newState) {
      state.isError = newState;
    },

    SET_ERROR_MESSAGE(state, newErrorMessage) {
      state.errorMessage = newErrorMessage;
    },

    SET_STARTING(state, newState) {
      state.isStarting = newState;
    },
  },

  actions: {
    updateUsername({ commit }, payload) {
      commit('SET_USERNAME', payload);
    },

    showWarning({ commit }, payload) {
      commit('SET_ERROR_STATE', payload);
    },

    updateErrorMessage({ commit }, payload) {
      commit('SET_ERROR_STATE', true);

      const noInternet = 'Network error: NetworkError';
      const internalError = 'Received status code 401';
      const invalidLogin = 'Could not resolve to a User';
      let message = '';

      if (payload.includes(noInternet)) {
        message = 'Kindly check and fix your internet to proceed.';
      } else if (payload.includes(internalError)) {
        message = 'Internal Error, it will be resolved soon.';
      } else if (payload.includes(invalidLogin)) {
        message = 'Try later, user does not exist.';
      } else {
        message = payload
          .replace('Error: Network error: ', '')
          .replace('Error: GraphQL error: ', '')
          .replace('Error: UI error: ', '');
      }

      commit('SET_ERROR_MESSAGE', message);

      setTimeout(() => {
        commit('SET_ERROR_STATE', false);
      }, 3000);
    },
  },

  modules: {
    userDetails,
    userRepositories,
  },
});
