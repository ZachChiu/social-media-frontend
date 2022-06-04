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
  <PostWall />
</template>

<script>
import PostWall from "@/views/PostsWall.vue";
import { reactive, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: { PostWall },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const store = useStore();

    let personalData = reactive({});

    const user = computed(() => store.getters["users/user"]);
    const isUser = computed(() => user.value._id === route.params.userId);

    const getPersonalData = () => {};

    if (isUser.value) {
      personalData = user.value;
    } else {
      getPersonalData();
      personalData = user.value;
    }

    onMounted(() => {
      getPersonalData();
    });
    return {
      personalData,
      isUser,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  border-right: 16px solid transparent;
}
</style>
