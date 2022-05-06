<template>
  <RouterView></RouterView>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "App",
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style type="scss">
@import "@/assets/styles/all.scss";

#app {
  @apply text-dark pb-10 font-noto overflow-auto h-screen;
}
</style>
