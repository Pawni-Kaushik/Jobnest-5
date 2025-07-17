import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adapt if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;