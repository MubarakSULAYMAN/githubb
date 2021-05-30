<template>
  <div class="nav-container">
    <div class="nav flex-row bg-black">
      <!-- @click="mobile_nav = !mobile_nav" -->
      <!-- menu icon -->
      <i aria-hidden="true" class="far fa-bars" title="open close menu"></i>

      <!-- @click="home" -->
      <!-- github logo -->
      <i aria-hidden="true" class="fab fa-github" title="github" @click="home"></i>

      <span class="input-wrap w-fit bg-black">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search or jump to..."
          class="bg-black"
          v-model="search_term"
          @focus="hide_slash = true"
          @blur="hide_slash = false"
          ref="searchInput"
        />
        <!-- @keypress.s="setSearchFocus" -->
        <!-- .exact -->
        <!-- focus on pressing of "s" -->
        <!-- @click="$ref.searchInput.focus" -->
        <span
          class="slash inline-block bg-black"
          v-show="!search_term && hide_slash === false"
        >
          /
        </span>
      </span>

<span v-if="avatarUrl && $route.path !== ''">
      <router-link
        to="/"
        class="w-fit bg-black"
        v-for="route in router_group"
        :key="route.name"
          @click.native="changeRoute"
      >
        <!-- :disabled="!whateverActivatesThisLink"
                :event="whateverActivatesThisLink ? 'click' : ''" -->
        {{ route.name }}
      </router-link>
      </span>

      <!-- v-if="user_exist" -->
      <div class="nav_extras flex-row ml-auto" v-if="avatarUrl">
        <!-- bell icon -->
        <i aria-hidden="true" class="far fa-bell" title="notification"></i>

        <!-- plus icon -->
        <i aria-hidden="true" class="far fa-plus" title="add new"></i>
        <i aria-hidden="true" class="fas fa-caret-down" title="notification"></i>
        <span class="user-profile dropdown" tabindex="0">
          <img
            :src="avatarUrl"
            :alt="username"
            class="w-full h-full rounded-full"
          />
        <i aria-hidden="true" class="fas fa-caret-down with-profile" title="notification"></i>
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
              v-for="option in main_options"
              :key="option.name"
            >
              <!-- @click.native="changeRoute(option.name)" -->
              Your {{ option.name }}
            </router-link>

            <hr />

            <router-link
              :to="option.route"
              v-for="option in other_options"
              :key="option.name"
            >
              {{ option.name }}
            </router-link>
          </div>
        </span>
        <!-- tooltip of "warning sign" and "Sorry, something went wrong. px-1 py-2" -->
      </div>
    </div>

    <div class="drawer flex-col bg-black" v-if="mobile_nav === true">
      <div class="input-wrap w-fit bg-black">
        <!-- <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search or jump to..."
                    class="bg-black"
                    v-model="search_term"
                    @focus="hide_slash = true"
                    @blur="hide_slash = false"
                    ref="search"
                    v-on:keyup.page-up="setSearchFocus"
                /> -->
        <!-- @keypress.s="setSearchFocus" -->
        <!-- .exact -->
        <!-- focus on pressing of "s" -->
        <!-- <span
                    class="slash inline-block bg-black"
                    v-show="!search_term && hide_slash === false"
                >
                    /
                </span> -->
      </div>

      <router-link to="/in-view" class="w-fit bg-black">
        Dashboard
      </router-link>

      <router-link
        to="/in-view"
        class="w-fit bg-black"
        v-for="route in router_group"
        :key="route.name"
      >
        {{ route.name }}
      </router-link>

      <router-link to="/in-view" class="w-fit bg-black"> Settings </router-link>

      <router-link :to="`/${username}`" class="w-fit bg-black">
        {{ username }}
      </router-link>

      <router-link to="/in-view" class="w-fit bg-black"> Sign out </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { mapState } from 'vuex';

export default {
  data() {
    return {
      mobile_nav: false,
      search_term: '',
      hide_slash: false,

      router_group: [
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

      other_options: [
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
      // this.goTo('/');
      // this.$store.dispatch('fetchCustomRepos', [7, 1]);
    },

    changeRoute() {
      this.$router.push(`/${this.username}?tab=repositories`);
      // return {};
    },

    // changeRoute(route) {
    //     console.log(route)
    //     switch (route) {
    //         case 'profile':
    //             this.$store.dispatch('fetchPinnedRepos')
    //             break
    //         case 'repository':
    //             this.$store.dispatch('fetchRepos', [30, 1])
    //             break
    //         // case 'project':
    //         //     // code block
    //         //     break
    //         // case 'stars':
    //         //     // code block
    //         //     break
    //         // case 'gists':
    //         //     // code block
    //         //     break
    //         // default:
    //         // // code block
    //     }
    // },

    derivedData() {
      return [
        {
          name: 'profile',
          route: `/${this.username}`,
        },
        {
          name: 'repository',
          route: `/${this.username}?tab=repositories`,
        },
        {
          name: 'projects',
          route: `/${this.username}?tab=projects`,
        },
        {
          name: 'stars',
          route: `/${this.username}?tab=stars`,
        },
        {
          name: 'gists',
          route: `/${this.username}?tab=packages`,
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
  },

  computed: {
    main_options() {
      return this.derivedData();
    },

    // ...mapState(['user_exist']),

    // ...mapState({
    //   username: (state) => state.user.username,
    //   user_info: (state) => state.user.user_info,
    // }),
    // username() {
    //   return 'username';
    // },
    // user_info() {
    //   return 'user_info';
    // },
    ...mapState(['username', 'avatarUrl']),
  },

  created() {
    window.addEventListener('keypress', this.focusNavInput);

    return [
      // this.$store.dispatch('fetchUsers'),
      console.log(
        this.username,
        // this.user_info,
        // this.user_info.name,
        // this.user_info.avatar_url,
        // this.user_exist,
      ),
      console.log('The nav is created.'),
    ];
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

  .with-profile{
    margin-left: 5px;
  }

i {
  display: inline-block;
}

.fa-bars {
  display: none;
}

/* .nav svg.octicon.octicon-plus, */
/* .user-profile {
  margin-left: 1rem;
} */

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

/* .nav a.router-link-exact-active.router-link-active {
    color: var(--github-dark);
} */

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

.dropdown:hover .dropdown-content,
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

/* .set-status svg {
  margin-right: 0.5rem;
  fill: var(--github-gray-dark);
} */

.set-status:hover {
  color: var(--github-blue);
}

/* .set-status:hover svg {
  fill: var(--github-blue);
} */

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
    width: 100vw;
    height: fit-content;
    padding: 0 1.5rem 2rem;
  }

  .drawer .input-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .drawer .input[type='text'] {
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: var(--github-white);
    border: 1px solid var(--github-darker);
    border-radius: 0.4rem;
    transition: all 0.2s ease-in;
  }

  .drawer .input[type='text']::placeholder,
  .drawer .input[type='text']::-moz-placeholder,
  .drawer .input[type='text']::-webkit-input-placeholder {
    color: var(--github-dark);
  }

  .drawer .input[type='text']:focus {
    width: 100% !important;
    color: var(--github-black);
    background-color: var(--github-white);
    border-color: var(--github-blue);
    outline: none;
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
}
</style>
