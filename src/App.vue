<template>
  <div id="app">
    <the-nav />
    <router-view />
  </div>
</template>

<script>
import TheNav from '@/views/layouts/TheNav.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: 'Github',
  },

  components: {
    TheNav,
  },

  // TODO: Create a redirect for route that are not matching as expected
  computed: {
    ...mapState(['username', 'userError']),
  },

  mounted() {
    if (localStorage.username) {
      this.$store.commit('SET_USERNAME', localStorage.username);
    }
  },

  watch: {
    username(newName) {
      localStorage.username = newName;
    },

    $route(newRoute, oldRoute) {
      // console.log('New: ', newRoute.fullPath, 'Old: ', oldRoute.fullPath);
      this.updateOldRoute(oldRoute.fullPath);
    },
  },

  methods: {
    ...mapActions(['updateErrorMessage', 'updateOldRoute']),
  },
};
</script>

<style>
</style>
