import axios from "axios";
import * as api from "./apiConfig";

export const apiRequester = () =>
  axios.create({
    baseURL: `${api.PROTOCOL}://${api.BASE}/api`,
    headers: { Accept: "application/json" },
  });

export default apiRequester;
