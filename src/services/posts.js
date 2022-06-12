import { callApi } from "@/lib/api/callApi";

/**
 * 取得貼文
 * @param {String} timeSort 時間排序
 * @param {String} content 搜尋內容
 * @returns {Promise} promise
 */
async function getPosts({ timeSort, content }) {
  const params = {
    timeSort,
    content,
  };
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
 * @param {String} postId 貼文 id
 * @returns {Promise} promise
 */
async function getPost(postId) {
  const res = await callApi({
    category: "post",
    apiName: postId,
    method: "get",
  });
  return res.data.data;
}

/**
 * 取得單一使用者貼文列表
 * @param {String} userId 使用者 id
 * @param {String} timeSort 時間排序
 * @param {String} content 搜尋內容
 * @returns {Promise} promise
 */
async function getUserPosts({ userId, timeSort, content }) {
  const params = {
    timeSort,
    content,
  };

  const res = await callApi({
    category: "posts",
    apiName: `user/${userId}`,
    method: "get",
    params,
  });
  return res.data.data;
}

/**
 * 貼文
 * @param content 貼文內容
 * @param image 貼文照片
 * @returns {Promise} promise
 */
async function createPost({ content, image }) {
  const res = await callApi({
    category: "post",
    apiName: "",
    method: "post",
    data: {
      content,
      image,
    },
  });
  return res.data;
}

/**
 * 按讚貼文
 * @param id 貼文 id
 * @returns {Promise} promise
 */
async function likePost(id) {
  const res = await callApi({
    category: "post",
    apiName: `${id}/like`,
    method: "post",
  });
  return res.data;
}

/**
 * 取消按讚貼文
 * @param id 貼文 id
 * @returns {Promise} promise
 */
async function unlikePost(id) {
  const res = await callApi({
    category: "post",
    apiName: `${id}/like`,
    method: "delete",
  });
  return res.data;
}

/**
 * 取得單一使用者貼文列表
 * @returns {Promise} promise
 */
async function getLikeList() {
  const res = await callApi({
    category: "posts",
    apiName: "like_list",
    method: "get",
  });
  return res.data.data;
}

/**
 * 留言
 * @param {String} id 貼文 id
 * @param {String} comment 留言內容
 * @returns {Promise} promise
 */
async function addComment({ id, comment }) {
  const res = await callApi({
    category: "post",
    apiName: `${id}/comment`,
    method: "post",
    data: {
      comment,
    },
  });
  return res.data.data;
}

export default {
  getPosts,
  getPost,
  createPost,
  likePost,
  unlikePost,
  getUserPosts,
  getLikeList,
  addComment,
};
