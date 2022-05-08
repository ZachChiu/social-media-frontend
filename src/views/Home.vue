<template>
  <Layout></Layout>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Layout from "@/layout/Layout.vue";

export default {
  components: { Layout },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style lang="scss" scoped></style>
