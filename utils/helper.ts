import adminController from "../controller/admin.controller";
import categoriesController from "../controller/categories.controller";


export const login = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };
  const response = await adminController.postAdminLogin(body);
  return response.body.token;
};

export const createCategory = async (token: string) => {
  const body = {
    name: "Test Category " + Math.floor(Math.random() * 10000),
  };

  const response = await categoriesController
    .postCategories(body)
    .set("Authorization", "Bearer " + token);

  return { response, originalBody: body };
};

export const getCategoryId = async (token: string) => {
  const body = {
    name: "Test Category " + Math.floor(Math.random() * 10000),
  };

  const response = await categoriesController
    .postCategories(body)
    .set("Authorization", "Bearer " + token);

  return response.body._id;
};
