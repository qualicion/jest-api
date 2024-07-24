import loginConfig from "../config/credentials.config";

import categoriesController from "../controller/categories.controller";
import { getCategoryId, login, createCategory } from "../utils/helper";

describe("Categories", () => {
  describe("Display categories", () => {
    it("GET /categories", async () => {
      const response = await categoriesController.getCategories();
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
      expect(Object.keys(response.body[0])).toEqual(["_id", "name"]);
    });
  });

  describe("Create category", () => {
    let token, category;

    beforeAll(async () => {
      token = await login(loginConfig.email, loginConfig.password);
    });

    it("POST /categories", async () => {
      category = await createCategory(token);
      expect(category.response.status).toBe(200);
      expect(category.response.body.name).toBe(category.originalBody.name);
    });
  });

  describe("Update category", () => {
    let token, categoryId;

    beforeAll(async () => {
      token = await login(loginConfig.email, loginConfig.password);
      categoryId = await getCategoryId(token);
    });

    it("PUT categories/id", async () => {
      const body = {
        name: "Test Category Updated " + Math.floor(Math.random() * 10000),
      };
      const response = await categoriesController
        .putCategories(categoryId, body)
        .set("Authorization", "Bearer " + token);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(body.name);
    });
  });

  describe("Delete category", () => {
    let token, categoryId;

    beforeAll(async () => {
      token = await login(loginConfig.email, loginConfig.password);
      categoryId = await getCategoryId(token);
    });

    it("DEL categories/id", async () => {
      const response = await categoriesController
        .deleteCategory(categoryId)
        .set("Authorization", "Bearer " + token);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(categoryId);
    });
  });
});
