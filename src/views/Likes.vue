<template>
  <Title title="我按讚的貼文"></Title>
  <template v-if="isLoading">
    <LoadingCard
      v-for="(card, index) in 3"
      :key="index"
      class="mb-4 last:mb-0"
    />
  </template>

  <EmptyCard v-else-if="likeList.length === 0" state="無按讚任何貼文" />
  <template v-else>
    <LikesCard
      v-for="like in likeList"
      :key="like._id"
      :post="like"
      class="mb-4 last:mb-0"
      @unlike-post="toggleLike($event, 'unlike')"
      @like-post="toggleLike($event, 'like')"
    ></LikesCard
  ></template>
</template>

<script>
import Title from "@/components/Common/Title.vue";
import LikesCard from "@/components/Likes/LikesCard.vue";
import LoadingCard from "@/components/Common/LoadingCard.vue";
import EmptyCard from "@/components/Common/EmptyCard.vue";
import postsService from "@/services/posts.js";
import { onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  components: { Title, LikesCard, LoadingCard, EmptyCard },
  setup() {
    const toast = useToast();
    let isLoading = ref(false);

    let likeList = reactive([]);
    const getLikeList = async () => {
      try {
        isLoading.value = true;
        const result = await postsService.getLikeList();
        likeList.push(...result);
      } catch (error) {
        toast.error("載入按讚貼文失敗，請重新整理");
      } finally {
        isLoading.value = false;
      }
    };

    const toggleLike = async (_id, action) => {
      let newPost = {};
      const index = likeList.findIndex((post) => post._id === _id);
      likeList[index].isLoading = true;
      try {
        if (action === "like") {
          newPost = await postsService.likePost(_id);
        } else {
          newPost = await postsService.unlikePost(_id);
        }

        likeList[index].likes = newPost.data.likes;
      } catch (error) {
        toast.error(action === "like" ? "取消按讚失敗" : "按讚失敗");
      } finally {
        likeList[index].isLoading = false;
      }
    };
    onMounted(() => {
      getLikeList();
    });

    return { likeList, isLoading, toggleLike };
  },
};
</script>
