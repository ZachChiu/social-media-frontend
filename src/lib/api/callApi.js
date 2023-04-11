import axios from "axios";
import url from "./url.js";
import Cookies from "js-cookie";

/**
 * 呼叫 API 函式，並可以將資料存在 APP 內(但是不包含讀取)
 * @param {String} category lambda的API類別
 * @param {String} apiName 該API的名稱
 * @param {Object} data 傳入該API的資料
 * @param {Object} method [post,get] API的方法等
 * @param {Object} headers request的header
 * @returns {Promise<Object>} API回傳結果
 */
async function callApi({
  category,
  apiName = "",
  data,
  params,
  headers = {},
  method,
}) {
  method = method.toLowerCase();
  const apiUrl = url[category] + apiName;

  const sendHeaders = Object.assign(headers, {
    Authorization: Cookies.get("jwt"),
    Accept: "application/json",
  });

  // #endregion
  try {
    const res = await axios({
      method,
      url: apiUrl,
      data,
      params,
      headers: sendHeaders,
    });
    return res;
  } catch (apiError) {
    return Promise.reject(apiError);
  }
}

export { callApi };
