import { request } from "@/utils/axios";

export const publishPostAPI = async (data) => request.post("/publish-post", data);
export const updatePublishedPostAPI = async (data) => request.post("/update-published-post", data);