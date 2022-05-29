import usersService from "@/services/users.js";
import defaultUserImg from "@/assets/img/default-user.png";

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
    localStorage.setItem("jwt", `Bearer ${data.jwt}`);
  },
  setUser(state, data) {
    state.user = data;
  },
  setSignOut(state) {
    state.user = null;
    localStorage.removeItem("jwt");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
