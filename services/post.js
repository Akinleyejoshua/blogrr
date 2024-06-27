import { request } from "@/utils/axios";

export const getPostAPI = async (data) => request.post("/get-post", data);
export const getPostsAPI = async (data) => request.post("/get-posts", data);
export const getCommentsAPI = async (data) => request.post("/get-comments", data);
export const likeActionAPI = async (data) => request.post("/like-action", data);
export const deletePostAPI = async (data) => request.post("/delete-post", data);