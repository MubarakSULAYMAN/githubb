<template>
  <div class="wrapper">
    <form class="content flex-col" @submit.prevent="getUser">
      <p>Will you like to proceed as</p>
      <input
        type="text"
        name=""
        id=""
        placeholder="Use a valid username or proceed with default."
        v-model="username"
        @keydown.enter="getUser"
      />
      <button class="ml-auto" type="submit">YES</button>
      <p v-if="processing">Continuing as "{{ username }}"...</p>
      <!-- <p v-if="[404].includes(request_status)">
        "{{ username }}" maybe INVALID!!!
      </p> -->
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      processing: false,
    };
  },

  methods: {
    getUser() {
      if (this.username !== '') {
        this.fetchUserDetails();
        this.fetchRepos();
        this.processing = true;
        this.$router.push(`/${this.username}?tab=repositories`);
      }
    },

    ...mapActions(['fetchUserDetails', 'fetchRepos']),
  },

  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },

      set(value) {
        this.$store.commit('SET_USERNAME', value);
      },
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  color: var(--github-black);
  background-color: var(--github-gray);
  z-index: 999;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40rem;
  padding: 2rem;
  border: 1px solid var(--github-gray-dark);
  border-radius: 1rem;
  background-color: var(--github-white);
  transform: translate(-50%, -70%);
  z-index: 1111;
}

p:first-child {
  font-size: 2rem;
}

p:first-child {
  font-family: 'Helvetica Bold';
  font-style: normal;
  font-weight: bold;
}

p:nth-child(3) {
  color: red;
}

input {
  margin: 0.5rem 0;
  width: 100%;
}

input:hover,
input:focus,
button:hover,
button:focus {
  box-shadow: 0 0 0 3px var(--github-lighter-blue);
}

input,
button {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: var(--github-blue);
  border: 1px solid var(--github-dark);
  border-radius: 0.25rem;
  background-color: var(--github-white);
}

button {
  color: var(--github-black);
}

button:hover {
  color: var(--github-blue);
}

button:focus {
  color: var(--github-white);
  border-color: transparent;
  background-color: var(--github-blue);
}

@media only screen and (max-width: 425px) {
  .content {
    width: 70%;
  }

  p:first-child {
    font-size: 1rem;
  }

  input {
    margin: 0.25rem 0;
  }

  input,
  button {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
