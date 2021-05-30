<template>
  <div class="home">
    <change-user-modal v-if="isStarting" />
  </div>
</template>

<script>
import ChangeUserModal from '@/components/ChangeUserModal.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    ChangeUserModal,
  },

  computed: {
    ...mapState(['isStarting']),
  },

  beforeCreate() {
    // alert('Hello, change user');
    // this.$store.commit('SET_STARTING', true);
    // alert(this.isStarting);
  },

  created() {
    this.$store.commit('SET_STARTING', true);
    // alert(this.isStarting);
    // this.$router.push('/MubarakSULAYMAN?tab=repositories');
  },
};
</script>
