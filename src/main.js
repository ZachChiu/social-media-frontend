import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueCropper from "vue-cropper";
import "vue-cropper/dist/index.css";
const app = createApp(App);

const toastOption = {
  timeout: 2000,

  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  },
};

app.use(VueCropper);
app.use(router);
app.use(store);
app.use(Toast, toastOption);
app.mount("#app");
