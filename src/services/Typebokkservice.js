import axios from "../api/axios";

const TYPEBOOK_API = "/TypesBook";
export const fetchtypesBook = async () => {
  return await axios.get(TYPEBOOK_API);
};
export const addtypesBook = async (TYPEBOOK) => {
  return await axios.post(TYPEBOOK_API,TYPEBOOK);
};
export const fetchtypesBookById = async (TYPEBOOKId) => {
  return await axios.get(TYPEBOOK_API + "/" + TYPEBOOKId);
};
export const deletetypesBook = async (TYPEBOOKId) => {
  return await axios.delete(TYPEBOOK_API + "/" + TYPEBOOKId);
};
export const edittypesBook = (TYPEBOOK) => {
  return axios.put(TYPEBOOK_API + "/" + TYPEBOOK.id, TYPEBOOK);
};

