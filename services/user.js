import { request } from "@/utils/axios";

export const getUserDataAPI = async (data) => request.post("/get-user", data);
export const getProfileDataAPI = async (data) => request.post("/get-profile", data);
export const updateProfileDataAPI = async (data) => request.post("/update-profile", data);