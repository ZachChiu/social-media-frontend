<template>
  <Title title="我按讚的貼文"></Title>
  <LikesCard class="mb-4"></LikesCard>
  <LikesCard class="mb-4"></LikesCard>
  <LikesCard class="mb-4"></LikesCard>
  <LikesCard class="mb-4 last:mb-0"></LikesCard>
</template>

<script>
import Title from "@/components/Common/Title.vue";
import LikesCard from "@/components/Likes/LikesCard.vue";

export default {
  components: { Title, LikesCard },
  setup() {},
};
</script>
