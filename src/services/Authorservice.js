import axios from "../api/axios";

const Author_API = "/Author";
export const fetchautors = async () => {
  return await axios.get(Author_API);
};
export const fetchautorsById = async (AuthorId) => {
  return await axios.get(Author_API + "/" + AuthorId);
};
export const deleteautors = async (AuthorId) => {
  return await axios.delete(Author_API + "/" + AuthorId);
};
export const addautors = async (Author) => {
  return await axios.post(Author_API, Author);
};
export const editautors = (Author) => {
  return axios.put(Author_API + "/" + Author.AuthorId, Author);
};

