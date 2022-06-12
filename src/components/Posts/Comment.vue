<template>
  <div class="comment-card bg-gray-light rounded-md p-4">
    <Info
      :username="comment.user.name"
      :avatar="comment.user.photo"
      :sub-text="subText"
      @onClickPersonal="onClickPersonal"
    ></Info>
    <p
      v-for="(comment, index) in commmentList"
      :key="index"
      class="ml-[56px] mt-1"
    >
      {{ comment }}
    </p>
  </div>
</template>

<script>
import Info from "@/components/Common/Info.vue";
import dayjs from "dayjs";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    Info,
  },
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const subText = computed(() =>
      dayjs(props.comment.createdAt).format("YYYY/MM/DD H:mm")
    );

    const onClickPersonal = () => {
      router.push({
        name: "personal-wall",
        params: { userId: props.comment.user._id },
      });
    };

    const commmentList = computed(() => {
      return props.comment.comment.split("\n");
    });
    return {
      subText,
      onClickPersonal,
      commmentList,
    };
  },
};
</script>
