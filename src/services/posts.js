import { callApi } from "@/lib/api/callApi";

/**
 * 取得貼文
 * @returns {Promise} promise
 */
async function getPosts(timeSort, content) {
  const res = await callApi({
    category: "posts",
    apiName: "",
    method: "get",
    params: {
      timeSort,
      content,
    },
  });
  return res.data;
}

export default {
  getPosts,
};
