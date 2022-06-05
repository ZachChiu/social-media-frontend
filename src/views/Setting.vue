<template>
  <Title title="修改個人資料"></Title>
  <div class="tabs flex">
    <div
      v-for="tab in tabs"
      :key="tab.jey"
      class="tab bg-white border hover:bg-gray-light border-gray border-opacity-30 rounded-t-lg py-2 px-6 cursor-pointer"
      :class="{ active: currentTtab === tab.key }"
      @click="currentTtab = tab.key"
    >
      {{ tab.text }}
    </div>
  </div>
  <div class="card px-[30px] lg:px-[105px] py-8 rounded-t-none">
    <Info v-if="currentTtab === 'info'" />
    <Password v-if="currentTtab === 'password'" />
  </div>
</template>

<script>
import Title from "@/components/Common/Title.vue";
import Info from "@/components/Setting/Info.vue";
import Password from "@/components/Setting/Password.vue";
import { readonly, ref } from "vue";

export default {
  components: { Title, Info, Password },
  setup() {
    const tabs = readonly([
      {
        key: "info",
        text: "資料修改",
      },
      {
        key: "password",
        text: "重設密碼",
      },
    ]);

    let currentTtab = ref("info");

    return { tabs, currentTtab };
  },
};
</script>

<style lang="scss" scoped>
.tab.active {
  @apply bg-gray text-white;
}
</style>
