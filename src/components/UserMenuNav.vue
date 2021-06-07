<template>
  <div class="top-nav flex-row">
    <div class="user-info flex-row">
      <div
        :class="['user-info_content', showAvatar ? 'slide-down' : '']"
        v-if="showAvatar"
      >
        <img :src="avatarUrl" :alt="user.login" />
        <strong
          ><p>{{ user.login }}</p></strong
        >
      </div>
    </div>

    <div class="main-menu flex-row">
      <div class="menu-links flex-row">
        <router-link
          :to="route.link"
          v-for="route in route_menu"
          :key="route.name"
          @click.native="changeRoute(route.name)"
        >
          <span class="mr-1" v-html="route.icon"></span>
          {{ route.name }}
          <span class="repo-count" v-if="route.name === 'Repositories'">
            {{ repoTotalCount }}
          </span>
        </router-link>
      </div>

      .
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    changeRoute(val) {
      this.$emit('updateRoute', val);
    },

    menu() {
      let currentUser = this.user.login;

      if (!currentUser) {
        currentUser = this.username;
      }

      return [
        {
          name: 'Overview',
          icon:
            '<svg class="octicon octicon-book UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill="#586069" fill-rule="evenodd" d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"></path></svg>',
          link: `/${currentUser}`,
        },
        {
          name: 'Repositories',
          icon:
            '<svg class="octicon octicon-repo UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill="#586069" fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>',
          link: `/${currentUser}?tab=repositories`,
        },
        {
          name: 'Projects',
          icon:
            '<svg class="octicon octicon-project UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill="#586069" fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path></svg>',
          link: `/${currentUser}?tab=projects`,
        },
        {
          name: 'Packages',
          icon:
            '<svg class="octicon octicon-package UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill="#586069" fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path></svg>',
          link: `/${currentUser}?tab=packages`,
        },
      ];
    },
  },

  computed: {
    route_menu() {
      return this.menu();
    },

    ...mapState([
      'user',
      'username',
      'avatarUrl',
      'repoTotalCount',
      'showAvatar',
    ]),
  },
};
</script>

<style scoped>
.top-nav {
  height: 6rem;
  border-bottom: 1px solid var(--github-dark);
  background-color: var(--github-white);
  z-index: 5;
}

.user-info {
  width: 25%;
  padding-left: 50px;
  padding-bottom: 0.5rem;
  align-items: flex-end;
}

.user-info_content {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--github-black);
  font-weight: 900 !important;
  transform: translateY(-200px);
  transition: all 0.5s ease-in-out;
}

.slide-down {
  transform: translateY(0);
}

img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.main-menu {
  width: 75%;
}

.menu-links {
  align-items: baseline;
}

.top-nav a {
  display: flex;
  width: fit-content;
  width: -moz-fit-content;
  margin-top: auto;
  padding: 1rem;
  color: var(--github-black);
  text-align: center;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.top-nav a:hover {
  border-color: var(--github-dark);
}

/* .top-nav a.router-link-exact-active { */
.top-nav a:nth-child(2) {
  /* .activeRoute { */
  border-color: var(--github-orange);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

.repo-count {
  margin-left: 0.5rem;
  padding: 0.15rem 0.4rem;
  font-size: var(--font-sm);
  font-weight: 400 !important;
  color: var(--github-black);
  border-radius: 1rem;
  background-color: var(--github-dark);
}

@media only screen and (max-width: 768px) {
  .user-info {
    width: 30%;
  }
}

@media only screen and (max-width: 425px) {
  .user-info {
    display: none;
  }
}
</style>
