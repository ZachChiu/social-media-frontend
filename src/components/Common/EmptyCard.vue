<template>
  <div class="empty card w-full text-gray text-center py-10 p-4">
    {{ state }}
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: "目前尚無動態，要不要跟大家分享今天發生什麼事",
    },
  },
  setup() {
    return {};
  },
};
</script>
