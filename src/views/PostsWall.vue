<template>
  <div class="mb-5 flex">
    <select
      v-model="timeSort"
      name=""
      id=""
      class="py-3 pl-4 pr-1 mr-3 card outline-none"
      @change="getPosts"
    >
      <option
        v-for="option in sortOption"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="w-full flex card overflow-hidden">
      <input
        class="bg-gray-light w-full h-full py-3 px-4 outline-none flex-1"
        type="text"
        v-model="searchKeyword"
        placeholder="搜尋貼文"
        @keyup.enter="getPosts"
      />
      <button
        class="block text-white w-[46px] bg-primary hover:bg-secondary font-[20px] outline-none"
        @click="getPosts"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
  <template v-if="isLoading">
    <LoadingCard
      v-for="(card, index) in 3"
      :key="index"
      class="mb-4 last:mb-0"
    />
  </template>

  <div
    v-else-if="posts.length === 0"
    class="empty card w-full text-gray text-center py-10 p-4"
  >
    目前尚無動態，要不要跟大家分享今天發生什麼事
  </div>
  <template v-else>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="mb-4 last:mb-0"
      @toggle-like="toggleLike"
    >
    </PostCard>
  </template>
</template>

<script>
import PostCard from "@/components/Posts/PostCard.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import postsService from "@/services/posts.js";
import { ref, reactive, readonly, onMounted } from "vue";
import { useToast } from "vue-toastification";

export default {
  components: { PostCard, LoadingCard },
  setup() {
    const toast = useToast();

    let timeSort = ref("desc");
    let searchKeyword = ref(null);
    let posts = reactive([]);
    let isLoading = ref(false);
    const sortOption = readonly([
      {
        text: "最新貼文",
        value: "desc",
      },
      {
        text: "最舊貼文",
        value: "asc",
      },
    ]);
    const getPosts = async () => {
      try {
        posts.splice(0);
        isLoading.value = true;
        const result = await postsService.getPosts({
          timeSort: timeSort.value,
          content: searchKeyword.value,
        });
        posts.push(...result);
        isLoading.value = false;
      } catch (error) {
        toast.error("載入貼文失敗，請重新整理");
      }
    };

    const toggleLike = () => {
      toast.info("功能還沒做好啦");
    };

    onMounted(() => {
      getPosts();
    });
    return {
      posts,
      isLoading,
      sortOption,
      timeSort,
      searchKeyword,
      getPosts,
      toggleLike,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  border-right: 16px solid transparent;
}
</style>
