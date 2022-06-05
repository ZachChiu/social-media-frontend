<template>
  <div
    v-if="isCropping"
    class="fixed flex-col top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 bg-dark bg-opacity-40"
  >
    <div class="w-72 h-72 md:w-96 md:h-96">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
      ></vueCropper>
    </div>
    <div class="mt-3 flex">
      <button
        class="btn-secondary px-6 py-0 mr-3"
        @click="$emit('update:isCropping', false)"
      >
        關閉
      </button>
      <button class="btn-primary px-6" @click="onClickCrop">裁切</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    option: {
      type: Object,
      default() {
        return {};
      },
    },
    isCropping: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const cropper = ref(null);

    const onClickCrop = () => {
      cropper.value.getCropData((data) => {
        emit("crop", data);
      });
    };

    onMounted(() => {
      console.log(cropper.value);
    });

    return {
      onClickCrop,
      cropper,
    };
  },
};
</script>
