<template>
  <div class="post w-full p-5 card">
    <div class="post-info flex items-center mb-4">
      <img class="w-[45px] mr-4" src="@/assets/img/default-user.png" alt="" />
      <div>
        <p class="font-bold hover:underline cursor-default">infoname</p>
        <p class="text-xs text-gray">2022/1/10 12:00</p>
      </div>
    </div>
    <div class="content">外面看起來就超冷.... 我決定回被窩繼續睡...</div>
    <img
      v-if="true"
      class="w-full mt-4 rounded-lg"
      src="@/assets/img/post-img.png"
      alt=""
    />
    <div class="group likes mt-4 inline-block cursor-pointer">
      <i
        class="fa-regular fa-thumbs-up transition group-hover:text-primary mr-2 text-[20px]"
      ></i>
      <span class="group-hover:text-primary">12</span>
      <!-- <span class="group-hover:text-primary">成為第一個案讚的朋友</span> -->
    </div>
    <div class="flex items-center mt-4">
      <img class="w-[40px] mr-4" src="@/assets/img/default-user.png" alt="" />

      <div class="w-full h-full flex rounded-lg overflow-hidden shadow-md">
        <input
          class="bg-white w-full h-full py-2 px-4 flex-1 outline-none"
          type="text"
          placeholder="說點什麼..."
        />
        <button
          class="block text-white w-[100px] bg-primary hover:bg-secondary font-[20px] outline-none"
        >
          留言
        </button>
      </div>
    </div>

    <Comment class="mt-4"></Comment>
  </div>
</template>

<script>
import Comment from "@/components/Posts/Comment.vue";
export default {
  components: { Comment },
  props: {},
};
</script>
