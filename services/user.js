import { request } from "@/utils/axios";

export const getUserDataAPI = async (data) => request.post("/get-user", data);
export const getProfileDataAPI = async (data) => request.post("/get-profile", data);
export const updateProfileDataAPI = async (data) => request.post("/update-profile", data);
export const followActionAPI = async (data) => request.post("/follow-action", data);
export const getFollowingFollowersAPI = async (data) => request.post("/get-following-followers", data);
export const userNotificationsActionAPI = async (data) => request.post("/notifications", data);