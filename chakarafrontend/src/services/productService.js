import { setCategories, setProduct, setSubCategories } from "../redux/slice/productSlice";
import { setToken, setUpdate, setUser } from "../redux/slice/userSlice";
import { store } from "../redux/store";
import baseService from "./baseService";
export const categoriesService = () => {
  return baseService
    .get("/all-category")
    .then((response) => {
        store.dispatch(setCategories(response.data.data))
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const addCategoriesService = (data) => {
    return baseService
      .post("/add-category", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };
  export const addSubCategoriesService = (data) => {
    return baseService
      .post("/add-sub-category", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };
  export const subCategoriesService = () => {
    return baseService
      .get("/all-sub-category")
      .then((response) => {
          store.dispatch(setSubCategories(response.data.data))
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };
  export const addProductService = (data) => {
    return baseService
      .post("/add-product", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };
  export const getProductService = () => {
    return baseService
      .get("/all-product")
      .then((response) => {
        store.dispatch(setProduct(response.data.data))
        return response.data;
      })
      .catch((error) =>
        error.response?.data ? error.response?.data : error.message
      );
  };