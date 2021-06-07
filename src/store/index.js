import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router';
import userDetails from './modules/userDetails';
import userRepositories from './modules/userRepositories';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStarting: false,
    selectedTab: 'Repositories',
    oldRoute: '',
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

    SET_OLD_ROUTE(state, value) {
      state.oldRoute = value;
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

    updateOldRoute({ commit }, payload) {
      commit('SET_OLD_ROUTE', payload);
    },

    showWarning({ commit }, payload) {
      commit('SET_ERROR_STATE', payload);
    },

    updateErrorMessage({ commit }, payload) {
      commit('SET_ERROR_STATE', true);

      const payloadString = JSON.stringify(payload);
      const noInternet = 'NetworkError';
      const internalError = 'status code 401';
      const invalidLogin = 'not resolve to a User';
      let message = '';

      if (payloadString.includes(noInternet)) {
        message = 'Kindly check and fix your internet to proceed.';
      } else if (payloadString.includes(internalError)) {
        message = 'Internal Error, it will be resolved soon.';
      } else if (payloadString.includes(invalidLogin)) {
        message = 'Try another username, user does not exist.';
      } else {
        message = payloadString
          .replace(': NetworkError', '')
          .replace(': graphQLErrors', '')
          .replace(': UI error', '');
      }

      commit('SET_ERROR_MESSAGE', message);

      // commit('SET_ERROR_MESSAGE', payload);
      // console.log('String: ', JSON.stringify(payload));

      setTimeout(() => {
        commit('SET_ERROR_STATE', false);
      }, 3000);

      // if (state.oldRoute === '/') {
      //    dispatch('pushRoute', '/', { root: true });
      // }
    },

    // pushRoute(val) {
    // setTimeout(() => {
    //   router.push(`'${route}'`).catch((err) => {
    //     if (err.name !== 'NavigationDuplicated') {
    //       console.log(err);
    //     }
    //   });
    // }, 3500);
    // },
  },

  modules: {
    userDetails,
    userRepositories,
  },
});
