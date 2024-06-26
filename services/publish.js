import { request } from "@/utils/axios";

export const publishPostAPI = async (data) => request.post("/publish-post", data);