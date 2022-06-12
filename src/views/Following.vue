<template>
  <Title title="追蹤名單"></Title>

  <template v-if="isLoading">
    <LoadingCard
      v-for="(card, index) in 3"
      :key="index"
      class="mb-4 last:mb-0"
    />
  </template>

  <EmptyCard v-else-if="followings.length === 0" state="無任何追蹤者" />
  <template v-else>
    <FollowCard
      v-for="following in followings"
      :key="following._id"
      class="mb-4 last:mb-0"
      :following="following"
    ></FollowCard>
  </template>
</template>

<script>
import Title from "@/components/Common/Title.vue";
import FollowCard from "@/components/Follows/FollowCard.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import EmptyCard from "@/components/Common/EmptyCard.vue";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import userService from "@/services/users.js";

export default {
  components: { Title, FollowCard, LoadingCard, EmptyCard },
  setup() {
    const toast = useToast();
    const followings = reactive([]);
    const isLoading = ref(false);

    const getFollowing = async () => {
      try {
        isLoading.value = true;
        const result = await userService.getFollowing();
        followings.push(...result);
      } catch (error) {
        toast.error("載入按讚追蹤者失敗，請重新整理");
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getFollowing();
    });
    return {
      followings,
      isLoading,
    };
  },
};
</script>
