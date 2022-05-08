import { createStore } from "vuex";
import user from "./modules/user";
import env from "./modules/env";

const store = createStore({
  modules: {
    user,
    env,
  },
});

export default store;
