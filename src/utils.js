import axios from "axios";

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const addUser = (url, obj) => axios.post(url, obj);

const updateUser = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteUser = (url, id) => axios.delete(`${url}/${id}`);

export { getAll, getById, addUser, updateUser, deleteUser };
