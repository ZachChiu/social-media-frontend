<template>
  <div class="card p-4 flex items-end justify-between">
    <div class="flex items-center">
      <img class="w-[40px] mr-4" src="@/assets/img/default-user.png" alt="" />
      <div>
        <p class="link cursor-pointer" @click="onClickPersonal">
          {{ post.user.name }}
        </p>
        <p class="text-sm text-gray">
          發文時間： {{ dayjs(post.createdAt).format("YYYY/MM/DD mm:ss") }}
        </p>
      </div>
    </div>
    <div class="flex items-center text-center">
      <div
        class="mr-5 md:mr-9 cursor-pointer hover:text-gray flex flex-col items-center"
        :class="hasLikePost ? 'text-primary' : 'text-secondary'"
        @click="toggleLike"
      >
        <i
          v-if="post.isLoading"
          class="fa-solid fa-spinner text-primary animate-spin-slow text-xl"
        ></i>
        <i v-else class="fa-regular fa-thumbs-up text-xl"></i>
        <p class="text-sm font-bold">{{ hasLikePost ? "取消" : "按讚" }}</p>
      </div>
      <div
        class="cursor-pointer text-dark hover:text-gray"
        @click="onClick2Post"
      >
        <i class="fa-regular fa-circle-right text-xl"></i>
        <p class="text-sm font-bold">查看</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters["users/user"]);

    const hasLikePost = computed(() =>
      props.post.likes.includes(user.value._id)
    );

    const onClickPersonal = () => {
      router.push({
        name: "personal-wall",
        params: { userId: props.post.user._id },
      });
    };

    const toggleLike = () => {
      if (props.post.isLoading) {
        return;
      }
      if (hasLikePost.value) {
        emit("unlike-post", props.post._id);
      } else {
        emit("like-post", props.post._id);
      }
    };

    const onClick2Post = () => {
      router.push({
        name: "post",
        params: {
          postId: props.post._id,
        },
      });
    };
    return {
      dayjs,
      hasLikePost,
      onClickPersonal,
      toggleLike,
      onClick2Post,
    };
  },
};
</script>
