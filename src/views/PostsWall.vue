<template>
  <div class="mb-4 flex">
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
        class="!bg-white w-full h-full py-3 px-4 outline-none flex-1 !rounded-r-none"
        type="text"
        v-model="searchKeyword"
        placeholder="搜尋貼文"
        @keyup.enter="getPosts"
      />
      <button
        class="block text-white w-[46px] btn-secondary font-[20px] outline-none rounded-l-none"
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
      @unlike-post="toggleLike($event, 'unlike')"
      @like-post="toggleLike($event, 'like')"
      @add-comment="addComment($event, post.id)"
    >
    </PostCard>
  </template>
</template>

<script>
import PostCard from "@/components/Posts/PostCard.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import EmptyCard from "@/components/Common/EmptyCard.vue";
import postsService from "@/services/posts.js";
import { ref, reactive, readonly, onMounted, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: { PostCard, LoadingCard, EmptyCard },
  setup() {
    const toast = useToast();
    const store = useStore();
    const route = useRoute();

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

    const user = computed(() => store.getters["users/user"]);
    const isUser = computed(() => user.value._id === route.params.userId);

    const getPosts = async () => {
      try {
        posts.splice(0);
        isLoading.value = true;
        let result = null;
        if (route.name === "posts-wall") {
          result = await postsService.getPosts({
            timeSort: timeSort.value,
            content: searchKeyword.value,
          });
        } else {
          result = await postsService.getUserPosts({
            userId: route.params.userId,
            timeSort: timeSort.value,
            content: searchKeyword.value,
          });
        }
        posts.push(...result);
        isLoading.value = false;
      } catch (error) {
        toast.error("載入貼文失敗，請重新整理");
      }
    };

    const toggleLike = async (_id, action) => {
      let newPost = {};
      const index = posts.findIndex((post) => post._id === _id);
      posts[index].isLoading = true;
      try {
        if (action === "like") {
          newPost = await postsService.likePost(_id);
        } else {
          newPost = await postsService.unlikePost(_id);
        }

        posts[index].likes = newPost.data.likes;
      } catch (error) {
        toast.error(action === "like" ? "取消按讚失敗" : "按讚失敗");
      } finally {
        posts[index].isLoading = false;
      }
    };

    const addComment = async (comment, id) => {
      try {
        const index = posts.findIndex((post) => post._id === id);
        const result = await postsService.addComment({ comment, id });

        posts[index].comments.unshift(result);
      } catch (error) {
        toast.error("留言失敗");
      }
    };

    watch(route, () => {
      if (route.name === "personal-wall") {
        isLoading.value = true;
        getPosts();
      }
    });

    onMounted(() => {
      if (isLoading.value) {
        return;
      }
      getPosts();
    });

    return {
      route,
      posts,
      isLoading,
      sortOption,
      timeSort,
      searchKeyword,
      getPosts,
      toggleLike,
      isUser,
      addComment,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  border-right: 16px solid transparent;
}
</style>
