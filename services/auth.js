import { request } from "@/utils/axios";

export const signupAPI = async (data) => request.post("/sign-up", data);

export const signinAPI = async (data) => request.post("/sign-in", data);

export const recoverAPI = async (data) => request.post("/recover", data);