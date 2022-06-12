<template>
  <img
    class="mr-4 object-cover"
    :src="avatar || defaultUserImg"
    :class="{ 'rounded-full': rounded }"
    :style="sizeStyle"
    alt="avatar"
  />
</template>

<script>
import defaultUserImg from "@/assets/img/default-user.png";
import { computed } from "vue";

export default {
  props: {
    avatar: {
      type: String,
      default() {
        return "";
      },
    },
    size: {
      type: String,
      default: "40",
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const sizeStyle = computed(() => {
      return { width: `${props.size}px`, height: `${props.size}px` };
    });

    return {
      defaultUserImg,
      sizeStyle,
    };
  },
};
</script>
