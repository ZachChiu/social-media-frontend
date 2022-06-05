<template>
  <div class="post w-full p-5 card">
    <div class="post-info flex items-center mb-4">
      <div
        class="w-[45px] h-[45px] user-img-wrapper mr-4 rounded-full overflow-hidden"
      >
        <img
          class="w-full h-full object-cover"
          :class="{ 'p-2': !post.user.photo }"
          :src="post.user.photo || defaultUserImg"
          alt=""
        />
      </div>
      <div>
        <p class="link cursor-pointer" @click="onClickPersonal">
          {{ post.user.name }}
        </p>
        <p class="text-xs text-gray">
          {{ dayjs(post.createdAt).format("YYYY/MM/DD mm:ss") }}
        </p>
      </div>
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

      <span v-if="post.likes.length" class="ml-2 group-hover:text-primary">{{
        getLikesText
      }}</span>
      <span v-else class="ml-2 group-hover:text-primary"
        >成為第一個按讚的朋友</span
      >
    </div>
    <div class="flex items-center mt-4">
      <img class="w-[40px] mr-4 p-2" :src="userPhoto" alt="" />

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
        ></textarea>
        <button
          class="btn-secondary block text-white w-[100px] font-[20px] outline-none rounded-l-none"
        >
          留言
        </button>
      </div>
    </div>

    <Comment v-if="post.comment" class="mt-4"></Comment>
  </div>
</template>

<script>
import Comment from "@/components/Posts/Comment.vue";
import defaultUserImg from "@/assets/img/default-user.png";
import dayjs from "dayjs";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { Comment },
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
    const processContent = (conetent) => {
      return conetent.replace("\n", "<br>");
    };

    const user = computed(() => store.getters["users/user"]);

    const hasLikePost = computed(() =>
      props.post.likes.includes(user.value._id)
    );

    const getLikesText = computed(() => {
      let text = props.post.likes.length;
      let num = props.post.likes.length;
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

    return {
      dayjs,
      onClickLike,
      user,
      processContent,
      onClickPersonal,
      getLikesText,
      hasLikePost,
      userPhoto: computed(() => store.getters["users/userPhoto"]),
      defaultUserImg,
    };
  },
};
</script>
