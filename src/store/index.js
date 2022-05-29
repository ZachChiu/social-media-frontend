import { createStore } from "vuex";
import users from "./modules/users";
import env from "./modules/env";

const store = createStore({
  modules: {
    users,
    env,
  },
});

export default store;
