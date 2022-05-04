<template>
  <div class="info flex items-start">
    <img class="w-[40px] mr-4" src="@/assets/img/default-user.png" alt="" />
    <div>
      <p class="font-bold">{{ username }}</p>
      <p class="text-xs text-gray">2022/1/10 12:00</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: "@/assets/img/default-user.png",
    },
    username: {
      type: String,
      default: "111",
    },
  },
  setup() {},
};
</script>
