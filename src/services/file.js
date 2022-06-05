import { callApi } from "@/lib/api/callApi";

/**
 * 上傳圖片
 * @param {String} image 時間排序
 * @returns {Promise} promise
 */
async function upload(image) {
  const data = {
    image,
  };
  const res = await callApi({
    category: "upload",
    apiName: "",
    method: "post",
    data,
  });
  return res.data.data;
}

export default {
  upload,
};
