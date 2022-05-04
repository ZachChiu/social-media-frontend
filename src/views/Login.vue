<template>111</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style type="scss" scoped></style>
