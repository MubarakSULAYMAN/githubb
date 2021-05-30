<template>
  <div id="app">
    <the-nav />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
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
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
