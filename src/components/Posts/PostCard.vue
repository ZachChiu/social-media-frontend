<template>
  <div class="post w-full p-5 card">
    <div class="post-info flex items-center mb-4">
      <Info
        :username="post.user.name"
        :avatar="post.user.photo"
        :sub-text="dayjs(post.createdAt).format('YYYY/MM/DD mm:ss')"
        size="45"
        @onClickPersonal="onClickPersonal"
      ></Info>
    </div>
    <div class="content" v-html="processContent(post.content)"></div>
    <img
      v-if="post.image"
      class="w-full mt-4 rounded-shadow"
      :src="post.image"
      alt=""
    />
    <div
      class="group likes mt-4 cursor-pointer flex items-center w-fit"
      @click="onClickLike"
    >
      <i
        v-if="post.isLoading"
        class="fa-solid fa-spinner text-primary animate-spin-slow text-[20px]"
      ></i>
      <i
        v-else
        class="fa-regular fa-thumbs-up transition group-hover:text-primary text-[20px]"
        :class="{ 'text-primary': hasLikePost }"
      ></i>

      <span v-if="post.likes?.length" class="ml-2 group-hover:text-primary">{{
        getLikesText
      }}</span>
      <span v-else class="ml-2 group-hover:text-primary"
        >成為第一個按讚的朋友</span
      >
    </div>
    <div class="flex items-center mt-4">
      <Avatar :avatar="userPhoto" size="35" />

      <div class="w-full h-full flex rounded-shadow overflow-hidden">
        <textarea
          name="content"
          id="content"
          rows="1"
          placeholder="說點什麼..."
          required
          autofocus
          autocomplete="off"
          class="py-1 px-2 rounded-r-none"
          v-model="comment"
        ></textarea>
        <button
          class="btn-secondary block text-white w-[100px] font-[20px] outline-none rounded-l-none"
          @click="onClickComment"
        >
          留言
        </button>
      </div>
    </div>
    <template v-if="post.comments?.length">
      <Comment
        v-for="comment in inPostPage ? post.comments : [post.comments[0]]"
        :key="comment._id"
        :comment="comment"
        class="mt-4"
      ></Comment>
      <p
        v-if="!inPostPage && post.comments.length > 1"
        class="mt-2 text-primary hover:underline cursor-pointer"
        @click="onClick2Post"
      >
        查看全部
      </p>
    </template>
  </div>
</template>

<script>
import Comment from "@/components/Posts/Comment.vue";
import Info from "@/components/Common/Info.vue";

import Avatar from "@/components/Common/Avatar.vue";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  components: { Comment, Avatar, Info },
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
    const route = useRoute();
    const processContent = (conetent) => {
      return conetent.replace("\n", "<br>");
    };
    const comment = ref("");

    const inPostPage = computed(() => route.name === "post");

    const user = computed(() => store.getters["users/user"]);

    const hasLikePost = computed(() =>
      props.post.likes.includes(user.value._id)
    );

    const getLikesText = computed(() => {
      let text = props.post?.likes.length;
      let num = props.post?.likes.length;
      if (hasLikePost.value) {
        text = `你${num - 1 > 0 ? `和其他 ${num - 1} 人` : ""}`;
      }
      return text;
    });

    const onClickLike = () => {
      if (props.post.isLoading) {
        return;
      }
      if (hasLikePost.value) {
        emit("unlike-post", props.post._id);
      } else {
        emit("like-post", props.post._id);
      }
    };

    const onClickPersonal = () => {
      router.push({
        name: "personal-wall",
        params: { userId: props.post.user._id },
      });
    };

    const onClick2Post = () => {
      router.push({
        name: "post",
        params: {
          postId: props.post._id,
        },
      });
    };

    const onClickComment = () => {
      emit("add-comment", comment.value);
      comment.value = "";
    };

    return {
      dayjs,
      onClickLike,
      onClick2Post,
      onClickComment,
      user,
      processContent,
      onClickPersonal,
      getLikesText,
      hasLikePost,
      inPostPage,
      userPhoto: computed(() => store.getters["users/userPhoto"]),
      comment,
    };
  },
};
</script>
