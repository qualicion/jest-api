import uploadController from "../controller/upload.controller";

describe("Upload file", () => {
  it("POST /upload/single", async () => {
    const response = await uploadController.uploadSingle("data/tunde.jpg");
    expect(response.status).toBe(200);
    expect(response.body.filename).toEqual("tunde.jpg");
  });

  it("POST /upload/multiple", async () => {
    const files = ["data/tunde.jpg", "data/test.png"];
    const response = await uploadController.uploadMultiple(files);
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
    expect(response.body[0].filename).toEqual("tunde.jpg");
    expect(response.body[1].filename).toEqual("test.png");
  });
});
