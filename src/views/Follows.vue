<template>
  <Title title="追蹤名單"></Title>
  <FollowCard class="mb-4"></FollowCard>
  <FollowCard class="mb-4"></FollowCard>
  <FollowCard class="mb-4"></FollowCard>
  <FollowCard class="mb-4 last:mb-0"></FollowCard>
</template>

<script>
import Title from "@/components/Common/Title.vue";
import FollowCard from "@/components/Follows/FollowCard.vue";
export default {
  components: { Title, FollowCard },
  setup() {},
};
</script>
