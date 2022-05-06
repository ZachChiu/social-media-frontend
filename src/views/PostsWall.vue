<template>
  <div class="mb-5 flex">
    <select name="" id="" class="select py-3 px-4 mr-3 card outline-none">
      <option value="asc">最新貼文</option>
      <option value="desc">最舊貼文</option>
    </select>
    <div class="w-full flex card overflow-hidden">
      <input
        class="bg-gray-light w-full h-full py-3 px-4 outline-none flex-1"
        type="text"
        placeholder="搜尋貼文"
      />
      <button
        class="block text-white w-[46px] bg-primary hover:bg-secondary font-[20px] outline-none"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
  <div
    v-if="posts.length === 0"
    class="empty w-full bg-gray-light shadow-md rounded-lg text-gray text-center py-10"
  >
    目前尚無動態，要不要跟大家分享今天發生什麼事
  </div>
  <template v-else>
    <PostCard v-for="post in posts" :key="post.id" class="mb-4 last:mb-0">
    </PostCard>
  </template>
</template>

<script>
import PostCard from "@/components/Posts/PostCard.vue";
import postsService from "@/services/posts.js";
import { ref, reactive, onMounted } from "vue";

export default {
  components: { PostCard },
  setup() {
    let posts = reactive([]);
    let isLoading = ref(false);

    const getPosts = async () => {
      try {
        isLoading = true;
        const result = await postsService.getPosts();
        posts = result;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading = false;
      }
    };

    onMounted(() => {
      getPosts();
    });
    return {
      posts,
      isLoading,
    };
  },
};
</script>

<style type="scss" scoped>
/* .select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
} */
</style>
