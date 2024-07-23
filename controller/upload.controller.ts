import * as supertest from "supertest";
import config from "../config/base.config";
const request = supertest(config.baseUrl);

import * as https from "https";

const customAgent = new https.Agent({
  rejectUnauthorized: false,
  family: 4, // Force IPv4
});

class UploadController {
  uploadSingle(filepath: string) {
    return request
      .post("/upload/single")
      .attach("single", filepath)
      .use((req) => {
        req.agent(customAgent);
      });
  }

  uploadMultiple(files: string[]) {
    const req = request.post("/upload/multiple");
    files.forEach((file) => {
      req.attach("multiple", file);
    });
    return req.use((req) => {
      req.agent(customAgent);
    });
  }
}
export default new UploadController();
