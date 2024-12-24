
  import { store } from "../redux/store";
  import baseService from "./baseService";
  export const registerService = (data) => {
    return baseService
      .post("/create", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };

