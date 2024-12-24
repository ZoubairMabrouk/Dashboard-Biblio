import axios from "../api/axios";

const COMMAND_API = "/Command";
export const fetchcommandes = async () => {
  return await axios.get(COMMAND_API);
};
export const fetchcommandesById = async (commandeId) => {
  return await axios.get(COMMAND_API + "/" + commandeId);
};
export const deletecommandes = async (commandeId) => {
  return await axios.delete(COMMAND_API + "/" + commandeId);
};
export const addcommandes = async (commande) => {
  return await axios.post(COMMAND_API, commande);
};
export const editcommandes = (commande) => {
  return axios.put(COMMAND_API + "/" + commande.id, commande);
};

