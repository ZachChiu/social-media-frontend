<template>
  <div
    v-if="isLoading"
    class="loading fixed inset-0 bg-dark z-10 opacity-10 flex items-center justify-center"
  >
    <i class="fa-solid fa-spinner text-white animate-spin-slow text-7xl"></i>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    return {
      isLoading: computed(() => store.state.env.isLoading),
    };
  },
};
</script>
