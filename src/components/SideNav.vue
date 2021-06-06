<template>
  <div class="container sticky" :style="{ zIndex: showItem ? 10 : 0 }">
    <div class="user-details grid">
      <div class="profile-pic_wrapper">
        <img
          :src="user.avatarUrl"
          :alt="user.name"
          class="profile-pic rounded-full"
          tabindex="0"
          v-show="showItem"
        />
        <!-- <span tabindex="0" class="set-status">Set status</span> -->
      </div>

      <div>
        <p class="fullname">
          {{ user.name }}
        </p>
        <p class="username">
          {{ user.login }}
        </p>
      </div>
    </div>

    <div class="main-details">
      <button class="status">Status</button>

      <p class="bio" v-if="user.bio != null">
        {{ user.bio }}
      </p>

      <button class="edit">Edit Profile</button>

      <div class="details-wrapper grid">
        <div class="repo-summary">
          <router-link to="">
            <i
              aria-hidden="true"
              class="far fa-user-friends"
              title="followers"
            ></i>
            <span class="follower">
              {{ user.followers ? user.followers.totalCount : '' }}</span
            >
            followers
          </router-link>
          ·
          <router-link to="">
            <span class="following">{{
              user.following ? user.following.totalCount : ''
            }}</span>
            following
          </router-link>
          ·
          <router-link to="">
            <i
              aria-hidden="true"
              class="far fa-star"
              title="starred repositories"
            ></i>
            <span class="star">
              {{
                user.starredRepositories
                  ? user.starredRepositories.totalCount
                  : ''
              }}
            </span>
          </router-link>
        </div>

        <div class="other-details">
          <p class="work" v-if="user.company != null">
            <i aria-hidden="true" class="far fa-building" title="company"></i>
            {{ user.company }}
          </p>
          <p class="location" v-if="user.location != null">
            <i
              aria-hidden="true"
              class="far fa-map-marker-alt"
              title="location"
            ></i>
            {{ user.location }}
          </p>
          <p class="email link" v-if="user.email != null">
            <i aria-hidden="true" class="far fa-envelope" title="email"></i>
            <a :href="'mailto:' + user.email"> {{ user.email }}</a>
          </p>
          <p class="website link" v-if="user.websiteUrl != ''">
            <i aria-hidden="true" class="far fa-link" title="website"></i>
            <a
              :href="'http://' + user.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ user.websiteUrl }}
            </a>
          </p>
          <p class="twitter link" v-if="user.twitterUsername != null">
            <i
              aria-hidden="true"
              class="showItem fab fa-twitter"
              title="twitter"
            ></i>
            <a
              :href="'https://twitter.com/' + user.twitterUsername"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{{ user.twitterUsername }}
            </a>
          </p>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      showItem: false,
      error: null,
    };
  },

  computed: {
    ...mapState(['user']),
  },

  async created() {
    this.$store.commit('SET_NAME', this.user.name);
    this.showItem = true;
    window.addEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showItem = top < 325;
      this.$store.commit('SET_AVATAR_STATUS', !this.showItem);
    },

    ...mapActions(['userDetails']),
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style scoped>
* {
  --custom-size: 18rem;
}

p,
.follower,
.following,
.star {
  color: var(--github-black);
  line-height: 1.5rem;
}

.profile-pic_wrapper {
  width: var(--custom-size);
  height: var(--custom-size);
  margin-bottom: 1rem;
}

img.profile-pic {
  position: relative;
  top: -2rem;
  width: 100%;
  height: 100%;
  border: 1px solid var(--github-dark);
  object-fit: contain;
}

.profile-pic_wrapper span {
  font-size: var(--font-sm);
}

.fullname {
  font-size: var(--font-xl);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
  line-height: 2rem;
}

.username {
  font-size: var(--font-lg);
  color: var(--github-gray) !important;
  margin-bottom: 1rem;
}

.bio {
  font-size: var(--font-md);
}

button {
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  color: var(--github-black);
  text-align: center;
  border: 1px solid var(--github-dark);
  border-radius: 0.5rem;
  background-color: var(--github-lighter-gray);
}

button.status {
  display: none;
}

button:hover,
button:focus {
  background-color: var(--github-gray-light);
}

button:focus {
  border-color: var(--github-blue);
  box-shadow: 0 0 0 3px var(--github-lighter-blue);
}

.repo-summary {
  margin-bottom: 1rem;
}

.repo-summary a,
.highlight a,
.other-details p a {
  color: var(--github-black);
  text-decoration: none;
  line-height: 1.5rem;
}

.repo-summary a:hover,
.repo-summary a:hover span,
.other-details p a:hover {
  color: var(--github-blue);
}

.other-details p a:hover {
  text-decoration: underline;
}

.fullname {
  line-break: auto;
}

.username,
.other-details {
  word-break: break-all;
}

.follower,
.following,
.star {
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

.twitter svg {
  display: inline-block;
  transform: scale(0.1);
  border: 1px solid red;
}

hr {
  width: 100%;
  height: 1px;
  margin: 1rem 0rem;
  background-color: var(--github-dark);
  border: none;
}

.highlight p:first-child {
  font-size: var(--font-md);
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

.highlight {
  margin-bottom: 10rem;
}

@media only screen and (max-width: 768px) {
  * {
    --custom-size: 10rem;
  }

  img.profile-pic {
    top: -1rem;
  }

  button {
    padding: 0.5rem 1rem;
  }
}

@media only screen and (max-width: 425px) {
  .user-details {
    grid-template-columns: 5rem 1fr;
  }

  * {
    --custom-size: 3.5rem;
  }

  .user-details {
    margin-top: 0.5rem;
  }

  .profile-pic_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .profile-pic_wrapper img {
    top: 0;
    width: var(--custom-size);
    height: var(--custom-size);
    border-radius: 100%;
  }

  p.username {
    margin-bottom: 0;
  }

  .set-status {
    display: none;
  }

  button.status {
    display: block;
    color: var(--github-gray) !important;
    font-size: var(--font-sm);
    text-align: left;
    background-color: var(--github-white);
  }

  .details-wrapper {
    grid-template-columns: 100%;
  }

  .repo-summary {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .other-details {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  .other-details p:not(p.email, p.website),
  hr,
  .highlight {
    display: none;
  }
}
</style>
