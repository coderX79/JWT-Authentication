import API from "./axios";

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const refreshToken = (refreshToken) => API.post("/auth/refresh-token", { refreshToken });
export const logoutUser = (refreshToken) => API.post("/auth/logout", { refreshToken });