import * as supertest from "supertest";
import config from "../config/base.config";
const request = supertest(config.baseUrl);

import * as https from "https";

const customAgent = new https.Agent({
  rejectUnauthorized: false,
  family: 4, // Force IPv4
});

class BrandController {
  getBrands() {
    return request.get("/brands").use((req) => {
      req.agent(customAgent);
    });
  }

  getBrandById(id: string) {
    return request.get(`/brands/${id}`).use((req) => {
      req.agent(customAgent);
    });
  }

  postBrand(data: { [key: string]: string | number }) {
    return request
      .post("/brands")
      .send(data)
      .use((req) => {
        req.agent(customAgent);
      });
  }

  putBrands(id: string, data: { [key: string]: string }) {
    return request
      .put(`/brands/${id}`)
      .send(data)
      .use((req) => {
        req.agent(customAgent);
      });
  }

  deleteBrands(id: string) {
    return request.delete(`/brands/${id}`).use((req) => {
      req.agent(customAgent);
    });
  }
}
export default new BrandController();
