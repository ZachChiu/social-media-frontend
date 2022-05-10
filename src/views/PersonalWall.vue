<template>
  <div class="card flex mb-4 overflow-hidden">
    <div class="w-[80px] h-[80px] border-gray border-opacity-30 border-r">
      <!-- <img v-if="post.user.photo" class="" :src="post.user.photo" alt="" /> -->
      <i
        class="fa-solid fa-user text-lg text-center text-gray bg-white w-full h-full flex items-center justify-center"
      ></i>
    </div>
    <div class="p-4 flex items-center justify-between flex-1">
      <div>
        <p class="font-bold">name</p>
        <p>987,987 人追蹤</p>
      </div>

      <button
        class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white font-bold py-1 px-8 block rounded-shadow"
      >
        追蹤
      </button>
    </div>
  </div>
  <div class="mb-5 flex">
    <select
      v-model="timeSort"
      name=""
      id=""
      class="py-3 pl-4 pr-1 mr-3 outline-none shadow-md rounded-lg bg-white"
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
    <div class="w-full flex shadow-md rounded-lg overflow-hidden">
      <input
        class="bg-white w-full h-full py-3 px-4 outline-none flex-1"
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

  <EmptyCard v-else-if="posts.length === 0" />

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
import EmptyCard from "@/components/Common/EmptyCard.vue";
import postsService from "@/services/posts.js";
import { ref, reactive, readonly, onMounted } from "vue";
import { useToast } from "vue-toastification";

export default {
  components: { PostCard, LoadingCard, EmptyCard },
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
