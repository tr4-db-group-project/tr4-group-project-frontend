import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-deployment-pzp5hjziaq-oc.a.run.app/api/booking",
  });

export default axiosInstance;
