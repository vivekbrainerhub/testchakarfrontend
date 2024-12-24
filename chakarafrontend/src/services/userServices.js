
  import { setToken } from "../redux/slice/userSlice";
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
  export const loginService = (data) => {
    return baseService
      .post("/login", data)
      .then((response) => {
        console.log(response.data,"response")
        store.dispatch(setToken(response?.data?.data));
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };
