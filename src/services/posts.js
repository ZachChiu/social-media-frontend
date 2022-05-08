import { callApi } from "@/lib/api/callApi";

/**
 * 取得貼文
 * @returns {Promise} promise
 */
async function getPosts({ timeSort, content }) {
  const params = {
    timeSort,
  };
  if (content) {
    params.content = content;
  }
  const res = await callApi({
    category: "posts",
    apiName: "",
    method: "get",
    params,
  });
  return res.data.data;
}

/**
 * 取得貼文
 * @param user 貼文者 id
 * @param content 貼文內容
 * @param image 貼文照片
 * @returns {Promise} promise
 */
async function createPost({
  user = "6272c65c97a24be38952ab6d",
  content,
  image,
}) {
  const res = await callApi({
    category: "posts",
    apiName: "",
    method: "post",
    data: {
      user,
      content,
      image,
    },
  });
  return res.data;
}

export default {
  getPosts,
  createPost,
};
