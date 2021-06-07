<template>
  <div>
    <animated-octocat v-if="isDataLoading" />

    <div class="users grid" v-if="isDataLoading === false">
      <user-menu-nav class="top-nav sticky" @updateRoute="checkRoute" />

      <side-nav class="side-nav" />

      <component :is="currentTab"></component>

      <users-footer class="footer flex-row" />
    </div>

    <!-- TODO: Add error and messages -->
    <error-notification>
      {{ errorMessage }}
    </error-notification>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ErrorNotification from '@/components/ErrorNotification.vue';
// import Repositories from '@/components/Repositories.vue';
import SideNav from '@/components/SideNav.vue';
import UserMenuNav from '@/components/UserMenuNav.vue';
import UsersFooter from '@/views/layouts/UsersFooter.vue';
import AnimatedOctocat from '../../components/AnimatedOctocat.vue';

export default {
  components: {
    UserMenuNav,
    SideNav,
    // Repositories,
    ErrorNotification,
    UsersFooter,
    AnimatedOctocat,
  },

  computed: {
    currentTab() {
      // const selectedTab = this.selectedTab;
      // if (selectedTab) {
      //   return () => import(`@/components/${selectedTab}.vue`);
      // }

      return () => import('@/components/Repositories.vue');
    },

    isDataLoading() {
      return this.userLoading || this.userReposLoading;
    },

    ...mapState([
      'selectedTab',
      'userLoading',
      'userReposLoading',
      'user',
      'username',
      'isError',
      'errorMessage',
    ]),
  },

  async created() {
    const currentUser = this.$router.currentRoute.path.slice(1);
    const username = this.username.toLowerCase();
    const pathQuery = '?tab=repositories';
    const routeName = this.$route.path.slice(1);
    const fullPath = this.$route.fullPath.toLowerCase();
    const pathMatch = fullPath === `/${username}${pathQuery}`;

    if (currentUser !== username) {
      this.$store.commit('SET_USERNAME', currentUser);
    } else {
      this.$store.commit('SET_USERNAME', username);
    }

    await (this.fetchUserDetails(), this.fetchRepos());

    if (!pathMatch) {
      this.$router.push(routeName + pathQuery).catch((err) => {
        if (err.name !== 'NavigationDuplicated') {
          console.log(err);
        }
      });
    }
  },

  methods: {
    goTo(route) {
      this.$router.push(route);
    },

    checkRoute(name) {
      if (name !== 'Repositories') {
        let currentUser = this.user.login;

        if (!currentUser) {
          currentUser = this.username;
        }

        this.updateErrorMessage('Feature presently unvailable');
        this.$router.push(`/${currentUser}?tab=repositories`).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            console.log(err);
          }
        });
      }
    },

    ...mapActions(['updateErrorMessage', 'fetchUserDetails', 'fetchRepos']),
  },
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
    padding-bottom: 2rem;
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
    padding-bottom: 1rem;
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
