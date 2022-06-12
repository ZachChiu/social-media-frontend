import { callApi } from "@/lib/api/callApi";

/**
 * 登入
 * @param {String} email email
 * @param {String} password password
 * @returns {Promise} promise
 */
async function signIn({ email, password }) {
  const res = await callApi({
    category: "users",
    apiName: "sign_in",
    method: "post",
    data: { email, password },
  });
  return res.data.data;
}

/**
 * 註冊
 * @param {String} name 姓名
 * @param {String} email email
 * @param {String} password password
 * @param {String} confirmPassword confirmPassword
 * @returns {Promise} promise
 */
async function signUp({ name, email, password, confirmPassword }) {
  const res = await callApi({
    category: "users",
    apiName: "sign_up",
    method: "post",
    data: { name, email, password, confirmPassword },
  });
  return res.data.data;
}

/**
 * 更新密碼
 * @param {String} password password
 * @param {String} confirmPassword confirmPassword
 * @returns {Promise} promise
 */
async function updatePassword({ password, confirmPassword }) {
  const res = await callApi({
    category: "users",
    apiName: "updatePassword",
    method: "post",
    data: { password, confirmPassword },
  });
  return res.data.data;
}

/**
 * 更新個人資料
 * @param {String} name 暱稱
 * @param {String} photo 照片網址
 * @param {String} sex 性別
 * @returns {Promise} promise
 */
async function updateProfile({ name, photo, sex }) {
  const res = await callApi({
    category: "users",
    apiName: "updateProfile",
    method: "patch",
    data: { name, photo, sex },
  });
  return res.data.data;
}

/**
 * 取得個人資料
 * @returns {Promise} promise
 */
async function getUser() {
  const res = await callApi({
    category: "users",
    apiName: "profile",
    method: "get",
  });
  return res.data.data;
}

/**
 * 取得個人資料
 * @param {String} id id
 * @returns {Promise} promise
 */
async function getUserById(id) {
  const res = await callApi({
    category: "users",
    apiName: `profile/${id}`,
    method: "get",
  });
  return res.data.data;
}

/**
 * 追蹤
 * @param {String} id 追蹤者id
 * @returns {Promise} promise
 */
async function postFollow(id) {
  const res = await callApi({
    category: "users",
    apiName: `${id}/follow`,
    method: "post",
  });
  return res.data.data;
}

/**
 * 取消追蹤
 * @param {String} id 追蹤者id
 * @returns {Promise} promise
 */
async function deleteFollow(id) {
  const res = await callApi({
    category: "users",
    apiName: `${id}/follow`,
    method: "delete",
  });
  return res.data.data;
}

/**
 * 取得追蹤名單
 * @returns {Promise} promise
 */
async function getFollowing() {
  const res = await callApi({
    category: "users",
    apiName: "following",
    method: "get",
  });
  return res.data.data;
}

export default {
  signIn,
  signUp,
  getUser,
  getUserById,
  updatePassword,
  updateProfile,
  postFollow,
  deleteFollow,
  getFollowing,
};
