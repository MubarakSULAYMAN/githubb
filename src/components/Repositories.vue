<template>
  <div class="repos flex-col">
    <div class="input-wrapper flex-row">
      <input
        type="text"
        name=""
        id="find-repo"
        class="find-repo"
        placeholder="Find a repository..."
      />
      <!-- <select name="" id="">
        <option value="">Type Others</option>
      </select>
      <select name="" id="">
        Languages
      </select>
      <button class="new-repo">New</button> -->
    </div>
    <div class="repo-card" v-for="repo in repos" :key="repo.id">
      <!-- {{ repoTotalCount }} -->
      <div class="repo-card_main grid">
        <div class="repo-card_details">
          <div class="repo-card_name">
            <a :href="repo.url" target="_blank" rel="noopener noreferrer">
              {{ repo.name }}
            </a>
            <span v-if="repo.isPrivate === true">Private</span>
          </div>

          <div class="fork-description" v-if="repo.isFork === true">
            Forked from
            <a
              :href="repo.parent.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ repo.parent.name }}
            </a>
          </div>
          <div class="repo-card_description" v-html="repo.description"></div>
          <div
            class="repo-card_tags"
            v-if="repo.repositoryTopics.nodes.length > 0"
          >
            <a
              :href="`http://github.com/topics/${tag.topic.name}`"
              target="_blank"
              rel="noopener noreferrer"
              v-for="tag in repo.repositoryTopics.nodes"
              :key="tag.topic.name"
            >
              <span>{{ tag.topic.name }}</span>
            </a>
          </div>

          <div class="repo-card_summary">
            <span class="language" v-if="repo.primaryLanguage !== null">
              <span
                class="dot inline-block"
                :style="{
                  backgroundColor: repo.primaryLanguage.color,
                }"
              ></span>
              {{ repo.primaryLanguage.name }}
            </span>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              v-if="repo.forkCount > 0"
            >
              <span class="fork">
                <i
                  aria-hidden="true"
                  class="far fa-code-branch"
                  title="fork"
                ></i>
                {{ repo.forkCount }}</span
              >
            </a>
            <span class="license" v-if="repo.licenseInfo !== null">
              <i
                aria-hidden="true"
                class="fas fa-balance-scale"
                title="license"
              ></i>
              {{ repo.licenseInfo.name }}
            </span>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <span class="issue">1 issue needs help</span>
            </a>
            <span class="date">
              Updated {{ repo.updatedAt ? repo.updatedAt : '' | customDate }}
            </span>
          </div>
        </div>

        <div class="repo-card_star flex-col">
          <button class="ml-auto" aria-labelledby="button-label">
            <i class="far fa-star" aria-hidden="true" focusable="false">
              <span id="button-label" hidden>Star</span>
            </i>
            Star
          </button>
        </div>
      </div>
    </div>

    <div class="paginate flex-row">
      <router-link to="" custom>
        <button
          :disabled="isFirstPage"
          :class="[isFirstPage ? 'disabled-btn' : '']"
          role="link"
          @click="gotoPrevious"
        >
          Previous
        </button>
      </router-link>
      <router-link to="" custom>
        <button
          :disabled="isLastPage"
          :class="[isLastPage ? 'disabled-btn' : '']"
          role="link"
          @click="gotoNext"
        >
          Next
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { mapActions, mapState } from 'vuex';
import gql from 'graphql-tag';

export default {
  name: 'Repository',
  metaInfo() {
    return {
      titleTemplate: `Your Repositories - ${this.newMetaInfo()}`,
    };
  },

  apollo: {
    userRepos: {
      query: gql`
        query getRepos($username: String!) {
          userRepos: user(login: $username) {
            repositories(
              first: 20
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                name
                description
                url
                updatedAt
                forkCount
                stargazerCount
                licenseInfo {
                  name
                }
                primaryLanguage {
                  name
                  color
                }
                isPrivate
                isFork
                parent {
                  name
                  url
                }
                repositoryTopics(first: 30) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,

      variables() {
        return {
          username: this.username,
        };
      },

      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },

  data() {
    return {
      userRepos: [],
      error: null,
    };
  },

  computed: {
    ...mapState(['username', 'repoTotalCount']),

    repos() {
      return this.userRepos.repositories
        ? this.userRepos.repositories.nodes
        : '';
    },

    isFirstPage() {
      return this.page === 1;
    },

    isLastPage() {
      return this.page === this.total_pages;
    },
  },

  methods: {
    setTotalRepos() {
      const x = this.userRepos.repositories;
      if (x) {
        return this.$store.commit('SET_TOTAL_REPO', x.totalCount);
      }

      return '';
    },

    ...mapActions(['updateErrorMessage']),

    gotoPrevious() {
      if (!this.isFirstPage) {
        // const newPage = this.page - 1;
        this.updateErrorMessage('Presently unvailable');
      }
    },

    gotoNext() {
      if (!this.isLastPage) {
        // const newPage = this.page + 1;
        this.updateErrorMessage('Presently unvailable');
      }
    },

    newMetaInfo() {
      if (this.user_info.name != null) {
        return `${this.user_info.login} (${this.user_info.name})`;
      }

      return this.user_info.login;
    },
  },

  async created() {
    dayjs.extend(relativeTime);
    dayjs.extend(localizedFormat);
    this.setTotalRepos();

    // const currentUser = this.$router.currentRoute.path.slice(1);
    // if (currentUser !== this.username) {
    //   this.$store.commit('SET_USERNAME', currentUser);
    //   await this.$apollo.queries.userRepos.refresh();
    // }
  },

  async beforeUpdate() {
    this.setTotalRepos();

    const currentUser = this.$router.currentRoute.path.slice(1);
    if (currentUser !== this.username) {
      this.$store.commit('SET_USERNAME', currentUser);
      await this.$apollo.queries.userRepos.refresh();
    }
  },

  // async mounted() {
  //   const currentUser = this.$router.currentRoute.path.slice(1);
  //   if (currentUser !== this.username) {
  //     this.$store.commit('SET_USERNAME', currentUser);
  //     await this.$apollo.queries.userRepos.refresh();
  //   }
  // },

  filters: {
    customDate(date) {
      if (!date) {
        return null;
      }

      if (dayjs(date).fromNow().includes('year')) {
        return `on ${dayjs(date).format('D MMM YYYY')}`;
      }

      if (
        dayjs(date).fromNow().includes('month')
        && parseInt(String(date).slice(0, 4), 10) === new Date().getFullYear()
      ) {
        return `on ${dayjs(date).format('D MMM')}`;
      }

      return dayjs(date).fromNow();
    },
  },
};
</script>

<style scoped>
:focus:not(:focus-visible) {
  outline: none;
}

:focus:not(:-moz-focusring) {
  outline: none;
}

a {
  color: inherit;
  text-decoration: none;
}

.input-wrapper {
  justify-items: baseline;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--github-dark);
}

input[type='text'].find-repo {
  /* width: 60%; */
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--github-dark);
  border-radius: 0.5rem;
}

input[type='text'].find-repo:focus {
  border-color: var(--github-blue);
  box-shadow: 0 0 0 3px var(--github-lighter-blue);
  outline: none;
}

select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--github-dark);
  border-radius: 0.5em;
  background-color: var(--github-lighter-gray);
  transition: all 0.3s ease;
}

select:first-child {
  width: 10rem;
}
select:nth-child(2) {
  width: 16rem;
}

select:hover,
select:focus {
  background-color: var(--github-gray-light);
}

select:focus {
  border-color: var(--github-blue);
  box-shadow: 0 0 0 3px var(--github-lighter-blue);
  outline: none;
}

button.new-repo {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: var(--github-white);
  background-color: var(--github-green);
  transition: all 0.3s ease;
}

button.new-repo:hover {
  background-color: var(--github-green-dark);
}

button.new-repo:focus {
  box-shadow: 0 0 0 3px var(--github-green-lighter);
  outline: none;
}

.repo-card {
  color: gray;
  line-height: 2rem;
  text-align: left;
}

.repo-card_main {
  grid-template-columns: 80% 20%;
  padding: 2rem 0;
  border-bottom: 1px solid var(--github-dark);
}

.repo-card_name a {
  margin-right: 0.5rem;
  font-size: var(--font-lg);
  color: var(--github-blue);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

.repo-card_name a:hover {
  text-decoration: underline;
}

.repo-card_name span {
  padding: 0 0.25rem;
  font-size: var(--font-sm);
  border: 1px solid var(--github-dark);
  border-radius: 0.5rem;
}

.repo-card_tags span {
  display: inline-block;
  width: fit-content;
  width: max-content;
  margin-right: 0.5rem;
  padding: 0.35rem 0.75rem;
  line-height: normal;
  color: var(--github-blue);
  font-size: var(--font-xs);
  overflow-wrap: normal;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  background-color: var(--github-lighter-blue-fade);
  transition: all 0.1s ease;
}

.repo-card_tags span:hover {
  background-color: var(--github-lighter-blue-fade-s);
}

.fork-description,
.repo-card_summary {
  font-size: var(--font-sm);
}

span .dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 100%;
}

.repo-card_summary span:not(span .dot) {
  margin-right: 1rem;
}

.repo-card_star button {
  padding: 0.5rem 1rem;
  color: var(--github-black);
  font-size: var(--font-sm);
  border: 1px solid var(--github-dark);
  border-radius: 0.5rem;
  background-color: var(--github-lighter-gray);
  transition: all 0.3s ease;
}

.repo-card_star button:hover,
.repo-card_star button:focus {
  background-color: var(--github-gray-light);
}

.repo-card_star button:focus {
  box-shadow: 0 0 0 3px var(--github-lighter-blue);
  outline: none;
}

span.fork:hover,
a span.issue:hover {
  color: var(--github-blue);
}

.paginate {
  justify-content: center;
  margin: 1rem 0 5rem 0;
}

.paginate button {
  padding: 0.5rem 1rem;
  color: var(--github-blue);
  font-size: var(--font-md);
  border: 1px solid var(--github-dark);
  background-color: var(--github-gray-light);
}

.paginate a:first-child button {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.paginate a:nth-child(2) button {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-left-color: transparent;
}

.paginate button:hover,
.paginate button:focus,
.paginate button.router-link-exact-active.router-link-active:focus {
  color: var(--github-white);
  background-color: var(--github-blue);
  outline: none;
}

.disabled-btn {
  opacity: 0.75;
  pointer-events: none;
}

@media only screen and (max-width: 768px) {
  .repo-card_star {
    justify-content: center;
  }
}

@media only screen and (max-width: 425px) {
  .repo-card_main {
    grid-template-columns: 75% 25%;
  }
  .repo-card_main {
    padding: 1rem 0;
  }
}
</style>
