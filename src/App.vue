<template>
  <div id="app">
    <!-- <p>{{ userError }}</p> -->
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

    if (this.userError) {
      this.updateErrorMessage(this.userError);
    }
  },

  watch: {
    username(newName) {
      localStorage.username = newName;
    },
  },

  methods: {
    ...mapActions(['updateErrorMessage']),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
