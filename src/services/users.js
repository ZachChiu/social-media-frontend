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
 * 取得更人資料
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

export default {
  signIn,
  signUp,
  getUser,
  updatePassword,
  updateProfile,
};
