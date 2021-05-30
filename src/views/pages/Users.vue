<template>
  <div>
    <animated-octocat v-if="isDataLoading" />

    <div class="users grid" v-if="!isDataLoading">
      <user-menu-nav class="top-nav sticky" @updateRoute="checkRoute" />

      <side-nav class="side-nav" />

      <repositories class="main-content" />

      <users-footer class="footer flex-row" />
    </div>

    <error-notification v-if="errorState === true">
      {{ errorMessage }}
    </error-notification>
    <!-- <div v-if="error">{{ error }}</div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ErrorNotification from '@/components/ErrorNotification.vue';
import Repositories from '@/components/Repositories.vue';
import SideNav from '@/components/SideNav.vue';
import UserMenuNav from '@/components/UserMenuNav.vue';
import UsersFooter from '@/views/layouts/UsersFooter.vue';
import AnimatedOctocat from '../../components/AnimatedOctocat.vue';

export default {
  components: {
    UserMenuNav,
    SideNav,
    Repositories,
    ErrorNotification,
    UsersFooter,
    AnimatedOctocat,
  },

  data() {
    return {
      overview: false,
      repositories: false,
      in_view: false,
    };
  },

  computed: {
    isDataLoading() {
      // return this.$apollo.queries.{name}.loading;
      return this.$apollo.loading;
    },

    ...mapState([
      'username',
      'errorState',
      'errorMessage',
    ]),
  },

  methods: {
    goTo(route) {
      this.$router.push(route);
    },

    checkRoute(val) {
      if (val !== 1) {
        this.$router.push(`/${this.username}?tab=repositories`);
      }
    },
  },

  // async created() {
  //   const currentUser = this.$router.currentRoute.path.slice(1);
  //   if (currentUser !== this.username) {
  //     this.$store.commit('SET_USERNAME', currentUser);
  //     await this.$apollo.queries.getUser.refresh();
  //     await this.$apollo.queries.getRepos.refresh();
  //   }
  // },
};
</script>

<style scoped>
.users {
  grid-template-columns: 25% 75%;
  padding-bottom: 3rem;
}

.top-nav {
  grid-column: 1 / 3;
  grid-row: 1;
  top: -2rem;
  background-color: var(--github-white);
}

.side-nav {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  height: fit-content;
  margin-left: 4rem;
  margin-right: 2rem;
}

.main-content {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin-right: 4rem;
}

@media only screen and (max-width: 768px) {
  .users {
    grid-template-columns: 30% 70%;
  }

  .side-nav {
    margin-left: 1.5rem;
    margin-right: 1rem;
  }

  .main-content {
    margin-right: 1.5rem;
  }
}

@media only screen and (max-width: 425px) {
  .users {
    grid-template-columns: 100%;
  }

  .top-nav {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    top: -1.5rem;
    display: flex;
    width: 100%;
    overflow-x: scroll;
  }

  .side-nav {
    grid-column: 1 / 2;
    grid-row: 1;
    margin: 0;
    padding: 0 1rem;
  }

  .main-content {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    margin-right: 0;
    padding: 0 1rem;
  }
}
</style>
