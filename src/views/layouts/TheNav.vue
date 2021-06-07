<template>
  <div class="nav-container">
    <div class="nav flex-row bg-black">
      <i
        aria-hidden="true"
        class="far fa-bars"
        title="open close menu"
        @click="mobileNav = !mobileNav"
      ></i>

      <i
        aria-hidden="true"
        class="fab fa-github"
        title="github"
        @click="home"
      ></i>

      <form
        class="input-wrap large-screen w-fit bg-black"
        @submit.prevent="getUser"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Search or jump to..."
          class="bg-black"
          v-model="searchTerm"
          @focus="hideSlash = true"
          @blur="hideSlash = false"
          ref="searchInput"
          @keydown.enter="getUser"
        />
        <!-- @keypress.s="setSearchFocus" -->
        <!-- .exact -->
        <!-- focus on pressing of "s" -->
        <!-- @click="$ref.searchInput.focus" -->
        <span
          class="slash inline-block bg-black"
          v-show="!searchTerm && hideSlash === false"
        >
          /
        </span>
      </form>

      <span
        class="route-group large-screen"
        v-if="avatarUrl && $route.path !== ''"
      >
        <router-link
          to="/"
          class="w-fit bg-black"
          v-for="route in routerGroup"
          :key="route.name"
          @click.native="changeRoute"
        >
          {{ route.name }}
        </router-link>
      </span>

      <span class="small-screen" v-if="!(avatarUrl && $route.path !== '')"></span>

      <div class="info large-screen" v-if="!(avatarUrl && $route.path !== '')">
        A query is required to proceed.
      </div>

      <div class="nav_extras flex-row ml-auto" v-if="avatarUrl">
        <!-- <div class="nav_extras flex-row ml-auto"> -->
        <i aria-hidden="true" class="far fa-bell" title="notification"></i>

        <i aria-hidden="true" class="far fa-plus" title="add new"></i>
        <i
          aria-hidden="true"
          class="fas fa-caret-down"
          title="notification"
        ></i>

        <span class="user-profile dropdown" tabindex="0">
          <img
            :src="avatarUrl"
            :alt="username"
            class="w-full h-full rounded-full"
          />
          <i
            aria-hidden="true"
            class="fas fa-caret-down with-profile"
            title="notification"
          ></i>
          <div class="dropdown-content">
            <p>
              <router-link :to="`/${username}`">
                Signed in as <br />
                <span>{{ username }}</span>
              </router-link>
            </p>

            <hr />

            <button class="set-status flex-row">
              <!-- smiley icon -->
              <i aria-hidden="true" class="far fa-smile" title="head emoji"></i>
              Set status
            </button>

            <hr />

            <router-link
              :to="option.route"
              v-for="option in mainOptions"
              :key="option.name"
            >
              <!-- @click.native="changeRoute(option.name)" -->
              Your {{ option.name }}
            </router-link>

            <hr />

            <router-link
              :to="option.route"
              v-for="option in otherOptions"
              :key="option.name"
            >
              {{ option.name }}
            </router-link>
          </div>
        </span>
        <!-- tooltip of "warning sign" and "Sorry, something went wrong. px-1 py-2" -->
      </div>
    </div>

    <div class="drawer flex-col bg-black" v-if="mobileNav === true">
      <!-- <div class="input-wrap w-fit bg-black"> -->
      <span class="input-wrap w-fit bg-black">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search or jump to..."
          class="bg-black"
          v-model="searchTerm"
          @focus="hideSlash = true"
          @blur="hideSlash = false"
          ref="searchInput"
        />
        <span
          class="slash inline-block bg-black"
          v-show="!searchTerm && hideSlash === false"
        >
          /
        </span>
      </span>
      <!-- </div> -->

      <div class="drawer-options" v-if="avatarUrl && $route.path !== ''">
        <router-link to="/in-view" class="w-fit bg-black">
          Dashboard
        </router-link>

        <router-link
          to="/in-view"
          class="w-fit bg-black"
          v-for="route in routerGroup"
          :key="route.name"
        >
          {{ route.name }}
        </router-link>

        <router-link to="/in-view" class="w-fit bg-black">
          Codespaces
        </router-link>

        <router-link to="/in-view" class="w-fit bg-black">
          Sponsors
        </router-link>

        <router-link to="/in-view" class="w-fit bg-black">
          Settings
        </router-link>

        <router-link :to="`/${username}`" class="w-fit bg-black user">
          <img
            :src="avatarUrl"
            :alt="username"
            class="w-full h-full rounded-full"
          />
          {{ username }}
        </router-link>

        <router-link to="/in-view" class="w-fit bg-black"
          ><i aria-hidden="true" class="fas fa-sign-out" title="Sign out"></i>
          Sign out
        </router-link>
      </div>

      <div class="info" v-else>A query is required to proceed.</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import { mapState } from 'vuex';

export default {
  data() {
    return {
      mobileNav: false,
      searchTerm: '',
      hideSlash: false,

      routerGroup: [
        {
          name: 'Pull requests',
          link: '',
        },
        {
          name: 'Issues',
          link: '',
        },
        {
          name: 'Marketplace',
          link: '',
        },
        {
          name: 'Explore',
          link: '',
        },
      ],

      otherOptions: [
        {
          name: 'Upgrade',
          route: '/not-available',
        },
        {
          name: 'Feature preview',
          route: '/not-available',
        },
        {
          name: 'Help',
          route: '/not-available',
        },
        {
          name: 'Settings',
          route: '/not-available',
        },
        {
          name: 'Sign out',
          route: '/not-available',
        },
      ],
    };
  },

  methods: {
    goTo(route) {
      this.$router.push(route);
    },

    home() {
      if (this.$router.currentRoute.path !== '') {
        return this.$router.push('/').catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            console.log(err);
          }
        });
      }
      return {};
    },

    changeRoute() {
      this.$router.push(`/${this.username}?tab=repositories`);
    },

    getUser() {
      if (this.searchTerm !== '') {
        this.$store.commit('SET_USERNAME', this.searchTerm);
        this.fetchUserDetails();
        this.fetchRepos();
        this.processing = true;
        this.$router
          .push(`/${this.searchTerm}?tab=repositories`)
          .catch((err) => {
            if (err.name !== 'NavigationDuplicated') {
              console.log(err);
            }
          });
      }
    },

    derivedData() {
      let currentUser = this.user.login;

      if (!currentUser) {
        currentUser = this.username;
      }

      return [
        {
          name: 'profile',
          route: `/${currentUser}`,
        },
        {
          name: 'repository',
          route: `/${currentUser}?tab=repositories`,
        },
        {
          name: 'projects',
          route: `/${currentUser}?tab=projects`,
        },
        {
          name: 'stars',
          route: `/${currentUser}?tab=stars`,
        },
        {
          name: 'gists',
          route: `/${currentUser}?tab=packages`,
        },
      ];
    },

    // focusNavInput(e) {
    //     let keyPressed = String.fromCharCode(e.keyCode).toLowerCase()
    //     // e.key
    //     // if (this === document.activeElement)
    //     // document.hasFocus()
    //     let evt = evt||window.event
    //     let ctrlDown = evt.ctrlKey||evt.metaKey

    //     // if (this.$refs.findRepo === document.activeElement) {
    //         if (ctrlDown && keyPressed === 's') {
    //             e.preventDefault()
    //             this.$refs.searchInput.focus()
    //         }
    //     // }
    // },

    ...mapActions(['fetchUserDetails', 'fetchRepos']),
  },

  computed: {
    mainOptions() {
      return this.derivedData();
    },

    ...mapState(['user', 'username', 'avatarUrl']),
  },

  created() {
    window.addEventListener('keypress', this.focusNavInput);
  },

  beforeDestroy() {
    window.removeEventListener('keypress', this.focusNavInput);
  },
};
</script>

<style scoped>
* {
  --input-max-width: 35rem;
}

.nav {
  position: relative;
  height: 4.5rem;
  padding: 0 2rem;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.fa-bars,
.fa-github,
.fa-bell,
.fa-caret-down,
.fa-plus {
  font-size: 16px;
  color: var(--github-white);
}

.fa-bars {
  font-size: 20px;
}

.fa-github {
  font-size: 30px;
}

.fa-caret-down:not(.with-profile),
.fa-bell {
  margin-right: 20px;
}

.fa-plus,
.fa-smile {
  margin-right: 5px;
}

.with-profile {
  margin-left: 5px;
}

i {
  display: inline-block;
}

.fa-bars {
  display: none;
}

.input-wrap {
  position: relative;
  display: inline-block;
  margin-left: 1rem;
}

input[type='text'] {
  width: 20rem;
  padding: 0.5rem 0.75rem;
  color: var(--github-white);
  border: 1px solid var(--github-darker);
  border-radius: 0.4rem;
  transition: all 0.2s ease-in;
}

input[type='text']::placeholder,
input[type='text']::-moz-placeholder,
input[type='text']::-webkit-input-placeholder {
  color: var(--github-dark);
}

input[type='text']:focus {
  width: var(--input-max-width);
  color: var(--github-black);
  background-color: var(--github-white);
  border-color: var(--github-blue);
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  outline: none;
}

.slash {
  position: absolute;
  top: 0.35rem;
  right: 0.75rem;
  padding: 0.1rem 0.5rem;
  color: var(--github-darker);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
  border: 1px solid var(--github-darker);
  border-radius: 0.25rem;
  box-sizing: border-box;
}

.input-copy {
  position: absolute;
  top: 50px;
  left: 0;
  width: var(--input-max-width);
  border-radius: 0.25rem;
  border-top: none;
  color: var(--github-white);
}

.info {
  margin: auto;
  color: var(--github-white);
  font-weight: 900;
  text-decoration: underline wavy red 1px;
}

.route-group {
  display: flex;
}

.nav a {
  margin-left: 1rem;
  padding: 1.5rem 0;
  color: var(--github-white);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
  text-decoration: none;
  background-color: var(--github-black);
}

.nav a:hover {
  outline: none;
}

.nav_extras {
  width: fit-content;
}

.user-profile img {
  width: 20px;
  height: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  right: -1rem;
  display: none;
  width: 200px;
  padding: 0.5rem 0;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: normal;
  text-align: left;
  border-radius: 0.5rem;
  border: 1px solid var(--github-dark);
  background-color: var(--github-white);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dropdown-content p a span {
  display: inline-block;
  margin-top: 5px;
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

.dropdown-content a:first-child:hover {
  color: var(--github-black);
  background-color: inherit;
}

.dropdown-content a {
  display: block;
  margin-left: 0 !important;
  padding: 8px 16px;
  color: var(--github-black);
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  background-color: inherit;
}

.dropdown-content a:hover {
  color: var(--github-white);
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: normal;
  background-color: var(--github-blue);
}

/* .dropdown:hover .dropdown-content, */
.dropdown:focus .dropdown-content {
  display: block;
}

.dropdown-content hr {
  width: 100%;
  height: 1px;
  margin: 0.5rem 0rem;
  background-color: var(--github-dark);
  border: none;
}

.dropdown-content::after {
  content: ' ';
  position: absolute;
  bottom: 100%;
  right: 10%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #ffffff transparent;
}

.dropdown-content:hover {
  visibility: visible;
}

.set-status {
  width: calc(100% - 2rem);
  margin: 0 1rem;
  padding: 0.5rem 0;
  font-size: 12px;
  color: var(--github-gray-dark);
}

.set-status:hover {
  color: var(--github-blue);
}

.drawer {
  display: none;
}

@media only screen and (max-width: 768px) {
  .nav {
    padding: 0 1.5rem;
  }

  input[type='text'] {
    width: 18rem;
  }

  .nav a {
    margin-left: 0.8rem;
  }
}

@media only screen and (max-width: 425px) {
  .nav {
    justify-content: space-between !important;
  }

  .nav_extras {
    margin-left: 0;
  }

  .fa-bars {
    display: block;
  }

  .small-screen {
    display: block;
  }

  .large-screen {
    display: none;
  }

  .input-wrap,
  .nav a,
  .fa-plus,
  .fa-caret-down,
  span.user-profile {
    display: none;
  }

  .fa-bell {
    margin-right: 0;
  }

  .drawer {
    display: flex;
    height: fit-content;
    padding: 0 1.5rem 2rem;
  }

  .drawer .input-wrap {
    position: relative;
    display: inline-block;
    width: calc(100vw - 4rem);
    margin: 0 auto 1rem;
  }

  .drawer input[type='text'] {
    width: 100%;
  }

  .drawer input[type='text']:focus {
    color: var(--github-white);
    background-color: var(--github-gray);
    border-radius: 0.4rem;
    border: 1px solid var(--github-blue);
  }

  .drawer .slash {
    position: absolute;
    top: 0.35rem;
    right: 0.75rem;
    padding: 0.1rem 0.5rem;
    color: var(--github-darker);
    font-family: 'Helvetica Bold';
    font-style: normal;
    font-weight: bold;
    border: 1px solid var(--github-darker);
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  .drawer .drawer-options {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .drawer a {
    width: 100%;
    padding: 0.75rem 0;
    color: var(--github-white);
    font-family: 'Helvetica Bold';
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    border-top: 1px solid var(--github-darker);
  }

  .drawer a:hover,
  .drawer a.router-link-exact-active.router-link-active {
    color: var(--github-dark);
  }

  .drawer a:hover {
    outline: none;
  }

  .drawer .user {
    display: flex;
    align-items: center;
  }

  .drawer img {
    width: 25px;
    margin-right: 5px;
  }

  .info {
    margin: 0;
  }
}
</style>
