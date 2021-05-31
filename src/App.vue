<template>
  <div id="app">
    <the-nav />
    <router-view />
  </div>
</template>

<script>
import TheNav from '@/views/layouts/TheNav.vue';
// import { mapState } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: 'Github',
  },

  components: {
    TheNav,
  },

  // TODO: Create a redirect for route that are not matching as expected
  // computed: {
  //   ...mapState(['username']),
  // },

  // created() {
  //   if (this.$router.currentRoute.path.slice(1)) {

  //   }
  //   return {}
  // },

  mounted() {
    // // show key pressed by user
    // window.addEventListener('keypress', e => {
    //     console.log(String.fromCharCode(e.keyCode))
    // })

    if (localStorage.username) {
      this.$store.commit('SET_USERNAME', localStorage.username);
    }
  },

  watch: {
    username(newName) {
      localStorage.username = newName;
    },

    page(newPage) {
      localStorage.page = newPage;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
}
</style>
