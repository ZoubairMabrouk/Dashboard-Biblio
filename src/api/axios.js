import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5159/api", // Assurez-vous que cette URL est correcte
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token du localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Ajoute le token aux headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Gère les erreurs
  }
);

export default instance;
