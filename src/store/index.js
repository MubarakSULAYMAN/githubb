import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStarting: false,
    username: 'MubarakSULAYMAN',
    avatarUrl: '',
    showAvatar: false,
    repoTotalCount: 0,
    errorState: true,
    errorMessage: 'An error just occured. It should resolve soon.',
  },

  getters: {
  },

  mutations: {
    SET_USERNAME(state, newUsername) {
      state.username = newUsername;
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

    SET_ERROR_STATE(state, newErrorState) {
      state.errorState = newErrorState;
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

    // updateAvatarUrl({ commit }, payload) {
    //   commit('SET_AVATAR_URL', payload);
    // },

    // updateShowAvatar({ commit }, payload) {
    //   commit('SET_AVATAR_STATUS', payload);
    // },

    showWarning({ commit }, payload) {
      commit('SET_ERROR_STATE', payload);
    },

    updateErrorMessage({ commit }, payload) {
      commit('SET_ERROR_STATE', payload);
    },
  },

  modules: {
  },
});
