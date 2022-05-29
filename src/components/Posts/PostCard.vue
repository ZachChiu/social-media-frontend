<template>
  <div class="post w-full p-5 card">
    <div class="post-info flex items-center mb-4">
      <div
        class="w-[45px] h-[45px] user-img-wrapper mr-4 rounded-full overflow-hidden"
      >
        <img
          v-if="post.user.photo"
          class="w-full h-full object-cover"
          :src="post.user.photo"
          alt=""
        />
        <i
          v-else
          class="fa-solid fa-user text-lg text-center text-gray bg-white w-full h-full flex items-center justify-center"
        ></i>
      </div>
      <div>
        <p class="link cursor-pointer">
          {{ post.user.name }}
        </p>
        <p class="text-xs text-gray">
          {{ dayjs(post.createAt).format("YYYY/MM/DD mm:ss") }}
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
      class="group likes mt-4 inline-block cursor-pointer"
      @click="toggleLike"
    >
      <i
        class="fa-regular fa-thumbs-up transition group-hover:text-primary mr-2 text-[20px]"
      ></i>
      <span v-if="post.likes" class="group-hover:text-primary">{{
        post.likes
      }}</span>
      <span v-else class="group-hover:text-primary">成為第一個按讚的朋友</span>
    </div>
    <div class="flex items-center mt-4">
      <img class="w-[40px] mr-4" :src="userPhoto" alt="" />

      <div class="w-full h-full flex rounded-shadow overflow-hidden">
        <textarea
          name="content"
          id="content"
          rows="1"
          placeholder="說點什麼..."
          required
          autofocus
          autocomplete="off"
          class="py-1 px-2"
        ></textarea>
        <button
          class="block text-white w-[100px] bg-primary hover:bg-secondary font-[20px] outline-none"
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
import dayjs from "dayjs"; //
import { computed } from "vue";
import { useStore } from "vuex";

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
    const toggleLike = () => {
      emit("toggle-like");
    };

    const processContent = (conetent) => {
      return conetent.replace("\n", "<br>");
    };

    return {
      dayjs,
      toggleLike,
      processContent,
      userPhoto: computed(() => store.getters["users/userPhoto"]),
    };
  },
};
</script>
