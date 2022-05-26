<template>
  <AppHeader />

  <router-view
    v-slot="{ Component }"
  >
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppPlayer />

  <AppModal />
</template>

<script>
import AppHeader from './components/Header.vue';
import AppModal from './components/Auth.vue';
import AppPlayer from './components/Player.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all .5s linear;
}

.fade-leave-to {
  transition: all .5s linear;
  opacity: 0;
}
</style>
