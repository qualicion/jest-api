import * as supertest from "supertest";
import config from "../config/base.config";
const request = supertest(config.baseUrl);

import * as https from "https";

const customAgent = new https.Agent({
  rejectUnauthorized: false,
  family: 4, // Force IPv4
});

class AdminController {
  postAdminLogin(data: { [key: string]: string }) {
    return request
      .post("/admin/login")
      .send(data)
      .use((req) => {
        req.agent(customAgent);
      });
  }
}
export default new AdminController();
