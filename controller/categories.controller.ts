import * as supertest from "supertest";
import config from "../config/base.config";
const request = supertest(config.baseUrl);
import * as https from "https";

const customAgent = new https.Agent({
  rejectUnauthorized: false,
  family: 4, // Force IPv4
});

class CategoriesController {
  getCategories() {
    return request.get("/categories").use((req) => {
      req.agent(customAgent);
    });
  }

  getCategoriesById(id: string) {
    return request.get("/categories/" + id).use((req) => {
      req.agent(customAgent);
    });
  }

  postCategories(data: { [key: string]: string | number }) {
    return request
      .post("/categories")
      .send(data)
      .use((req) => {
        req.agent(customAgent);
      });
  }

  putCategories(id: string, data: { [key: string]: string | Object }) {
    return request
      .put("/categories/" + id)
      .send(data)
      .use((req) => {
        req.agent(customAgent);
      });
  }

  deleteCategory(id: string) {
    return request.delete("/categories/" + id).use((req) => {
      req.agent(customAgent);
    });
  }
}
export default new CategoriesController();
