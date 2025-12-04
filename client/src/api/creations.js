import axios from "axios"; // your axios instance

export const createCreationAPI = (data) => axios.post("/creations", data);
export const getCreationsAPI = (params) => axios.get("/creations", { params });
export const updateCreationAPI = (id, data) => axios.put(`/creations/${id}`, data);
export const deleteCreationAPI = (id) => axios.delete(`/creations/${id}`);
