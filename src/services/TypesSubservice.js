import axios from "../api/axios";

const SUBTYPE_API = "/SubType";
export const fetchSUBTYPE = async () => {
  return await axios.get(SUBTYPE_API);
};
export const addSUBTYPE = async (SUBTYPE) => {
  return await axios.post(SUBTYPE_API,SUBTYPE);
};
export const fetchSUBTYPEById = async (SUBTYPEId) => {
  return await axios.get(SUBTYPE_API + "/" + SUBTYPEId);
};
export const deleteSUBTYPE = async (SUBTYPEId) => {
  return await axios.delete(SUBTYPE_API + "/" + SUBTYPEId);
};
export const editSUBTYPE = (SUBTYPE) => {
  return axios.put(SUBTYPE_API + "/" + SUBTYPE.id, SUBTYPE);
};

