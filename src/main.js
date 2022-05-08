import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App);

const toastOption = {
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  },
};

app.use(router);
app.use(store);
app.use(Toast, toastOption);
app.mount("#app");
