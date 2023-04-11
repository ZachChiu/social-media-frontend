<template>
  <LoadingCard v-if="isLoading" class="mb-4 last:mb-0" />
  <div v-else class="card flex mb-4 overflow-hidden">
    <Avatar
      class="!mr-0"
      :avatar="personalData?.photo"
      size="80"
      :rounded="false"
    />

    <div class="p-4 flex items-center justify-between flex-1">
      <div class="flex-1 mr-5">
        <p class="font-bold">{{ personalData.name }}</p>
        <div
          v-if="isFetching"
          class="animate-pulse h-2 rounded bg-gray my-2 w-full"
        ></div>
        <p v-else>{{ personalData?.followers?.length }} 人追蹤</p>
      </div>

      <button
        v-if="!isUser"
        class="text-dark hover:text-white disabled:bg-disabled disabled:text-white font-bold py-1 px-8 block rounded-shadow"
        :class="[
          hasFollowed
            ? 'bg-gray hover:bg-dark'
            : 'bg-secondary hover:bg-primary',
        ]"
        @click="toggleFollow"
      >
        {{ hasFollowed ? "取消追蹤" : "追蹤" }}
        <i
          v-if="isFetching"
          class="fa-solid fa-spinner animate-spin-slow text-sm"
        ></i>
      </button>
    </div>
  </div>
  <PostWall :key="currentUserId" />
</template>

<script>
import PostWall from "@/views/PostsWall.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import Avatar from "@/components/Common/Avatar.vue";

import { reactive, onMounted, computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import userService from "@/services/users.js";

export default {
  components: { PostWall, LoadingCard, Avatar },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const store = useStore();
    const isLoading = ref(false);
    const isFetching = ref(false);
    let personalData = reactive({});

    const currentUserId = computed(() => route.params.userId);
    const user = computed(() => store.getters["users/user"]);
    const isUser = computed(() => user.value._id === currentUserId.value);

    const hasFollowed = computed(() => {
      if (isUser.value) {
        return false;
      } else {
        return user.value?.following?.some(
          (follow) => follow.user._id === currentUserId.value
        );
      }
    });

    const getPersonalData = async () => {
      for (let key in personalData) {
        delete personalData[key];
      }
      const result = await userService.getUserById(currentUserId.value);
      Object.assign(personalData, result);
    };

    const toggleFollow = async () => {
      if (isFetching.value) {
        return;
      }
      try {
        isFetching.value = true;

        if (hasFollowed.value) {
          await userService.deleteFollow(currentUserId.value);
        } else {
          await userService.postFollow(currentUserId.value);
        }
        await getPersonalData();
        await store.dispatch("users/getUser");
        toast.success(hasFollowed.value ? "已追蹤" : "已取消追蹤");
      } catch (error) {
        toast.error(hasFollowed.value ? "追蹤失敗" : "取消追蹤失敗");
      } finally {
        isFetching.value = false;
      }
    };

    watch(route, async () => {
      if (route.name === "personal-wall") {
        isLoading.value = true;
        await getPersonalData();
        isLoading.value = false;
      }
    });

    onMounted(async () => {
      if (isUser.value) {
        Object.assign(personalData, user.value);
      } else {
        isLoading.value = true;
        await getPersonalData();
        isLoading.value = false;
      }
    });
    return {
      personalData,
      isUser,
      isLoading,
      isFetching,
      hasFollowed,
      toggleFollow,
      currentUserId,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  border-right: 16px solid transparent;
}
</style>
