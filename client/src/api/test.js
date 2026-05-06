import API from "./axios";

export const getProfile = () => API.get("/test/profile");