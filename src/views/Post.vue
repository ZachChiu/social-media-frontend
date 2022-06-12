<template>
  <LoadingCard v-if="isLoading" />
  <EmptyCard v-else-if="!post._id" />
  <PostCard
    v-else
    :post="post"
    @unlike-post="toggleLike($event, 'unlike')"
    @like-post="toggleLike($event, 'like')"
    @add-comment="addComment($event, post.id)"
  >
  </PostCard>
</template>

<script>
import PostCard from "@/components/Posts/PostCard.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import EmptyCard from "@/components/Common/EmptyCard.vue";
import postsService from "@/services/posts.js";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  components: { PostCard, LoadingCard, EmptyCard },
  setup() {
    const route = useRoute();
    const toast = useToast();
    let post = reactive({});
    let isLoading = ref(true);

    const getPost = async () => {
      try {
        isLoading.value = true;
        const result = await postsService.getPost(route.params.postId);
        Object.assign(post, result);
      } catch (error) {
        toast.error("查無貼文");
      } finally {
        isLoading.value = false;
      }
    };

    const toggleLike = async (_id, action) => {
      let newPost = {};
      post.isLoading = true;
      try {
        if (action === "like") {
          newPost = await postsService.likePost(_id);
        } else {
          newPost = await postsService.unlikePost(_id);
        }

        post.likes = newPost.data.likes;
      } catch (error) {
        toast.error(action === "like" ? "取消按讚失敗" : "按讚失敗");
      } finally {
        post.isLoading = false;
      }
    };

    const addComment = async (comment, id) => {
      try {
        const result = await postsService.addComment({ comment, id });

        post.comments.push(result);
      } catch (error) {
        toast.error("留言失敗");
      }
    };

    onMounted(() => {
      getPost();
    });
    return {
      post,
      isLoading,
      toggleLike,
      addComment,
    };
  },
};
</script>
