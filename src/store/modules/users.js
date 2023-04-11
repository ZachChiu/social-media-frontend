import usersService from "@/services/users.js";
import defaultUserImg from "@/assets/img/default-user.png";
import Cookies from "js-cookie";

const state = {
  user: {},
};
const getters = {
  user(state) {
    return state.user;
  },
  userPhoto(state) {
    return state?.user?.photo || defaultUserImg;
  },
};
const actions = {
  async signIn({ commit }, { email, password }) {
    try {
      const result = await usersService.signIn({ email, password });
      return commit("setJWT", result);
    } catch (error) {
      throw error.response.data.message || "登入失敗";
    }
  },
  async getUser({ commit }) {
    try {
      const result = await usersService.getUser();
      return commit("setUser", result);
    } catch (error) {
      commit("setSignOut");
      throw error.response.data.message || "尚未登入";
    }
  },
};

const mutations = {
  setJWT(state, data) {
    Cookies.set("jwt", `Bearer ${data.jwt}`, { expires: 7, path: "" });
  },
  setUser(state, data) {
    state.user = data;
  },
  setSignOut(state) {
    state.user = null;
    Cookies.remove("jwt");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
