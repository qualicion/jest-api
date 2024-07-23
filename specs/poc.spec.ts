import * as supertest from "supertest";
const request = supertest("https://jsonplaceholder.typicode.com/");

describe("POC tests", () => {
  describe("GET requests", () => {
    it("GET /posts", async () => {
      const response = await request.get("/posts");

      expect(response.statusCode).toBe(200);
      expect(response.body[0].id).toBe(1);
    });

    it("GET /comment with query params", async () => {
      //const response = await request.get("comments?postId=1");
      const response = await request
        .get("/comments")
        .query({ postId: 1, limit: 10 });
      expect(response.body[0].postId).toBe(1);
    });
  });

  describe("POST requests", () => {
    it("POST /post  ", async () => {
      const data = {
        title: "My favourite animes",
        body: "Naruto is the best",
        userId: 1,
      };
      const response = await request.post("/posts").send(data);
      console.log(response.body);
      expect(response.body.title).toBe(data.title);
    });
  });

  describe("PUT requests", () => {
    it("PUT /post/1  ", async () => {
      const data = {
        title: "My favourite song",
        body: "Naruto is number 2",
        userId: 2,
      };

      const getResponse = await request.get("/posts/1");

      const beforeTitle = getResponse.body.title;
      //   const beforeBody = getResponse.body;
      //   console.log(beforeBody);
      console.log(beforeTitle);

      const response = await request.put("/posts/1").send(data);
      console.log(response.body);
      expect(response.body.title).not.toBe(beforeTitle);
      expect(response.body.title).toBe(data.title);
    });
  });

  describe("PATCH requests", () => {
    it("PATCH /post/1  ", async () => {
      const data = {
        title: "My new title",
      };

      const getResponse = await request.get("/posts/1");

      const beforeTitle = getResponse.body.title;
      console.log(beforeTitle);

      const response = await request.patch("/posts/1").send(data);
      console.log(response.body);
      expect(response.body.title).not.toBe(beforeTitle);
      expect(response.body.title).toBe(data.title);
    });
  });

  describe("DELETE requests", () => {
    it("DELETE /post/:id", async () => {
      const response = await request.delete("/posts/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
