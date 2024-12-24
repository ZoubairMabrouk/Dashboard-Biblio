import axios from "../api/axios";

const SUBS_API = "/Subscribe";
export const fetchSubscribes = async () => {
  return await axios.get(SUBS_API);
};
export const addSubscribe = async (SUBS) => {
  return await axios.post(SUBS_API,SUBS);
};
export const fetchSubscribeById = async (SUBSId) => {
  return await axios.get(SUBS_API + "/" + SUBSId);
};
export const deleteSubscribe = async (SUBSId) => {
  return await axios.delete(SUBS_API + "/" + SUBSId);
};
export const editSubscribe = (SUBS) => {
  return axios.put(SUBS_API + "/" + SUBS.id, SUBS);
};

