import brandController from "../controller/brand.controller";
import config from "../config/base.config";

describe("Brands", () => {
  describe("Fetch brands", () => {
    it("Check brands, number of brands & key pairs", async () => {
      const response = await brandController.getBrands();
      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toBeGreaterThan(1);
      expect(Object.keys(response.body[0])).toEqual(["_id", "name"]);
    });
  });

  describe("Create brand", () => {
    let postBrand;
    const brand = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Description",
    };
    beforeAll(async () => {
      postBrand = await brandController.postBrand(brand);
    });

    afterAll(async () => {
      await brandController.deleteBrands(postBrand.body._id);
    });

    it("POST /brands", async () => {
      expect(postBrand.statusCode).toEqual(200);
      expect(postBrand.body.name).toEqual(brand.name);
      expect(postBrand.body).toHaveProperty("createdAt");
      expect(postBrand.body.description).toEqual(brand.description);
    });

    it("Schema validation - Name is a mandatory field", async () => {
      const brand = {
        name: "",
        description: "Test Brand Description",
      };

      const response = await brandController.postBrand(brand);

      expect(response.statusCode).toEqual(422);
      expect(response.body.error).toEqual("Name is required");
    });

    it("Schema validation - Minimum character length should be > 1", async () => {
      const brand = {
        name: "a",
        description: "Test Brand Description",
      };
      const response = await brandController.postBrand(brand);

      expect(response.statusCode).toEqual(422);
      expect(response.body.error).toEqual("Brand name is too short");
    });

    it("Business logic - Duplicate brand entries", async () => {
      // 1st request
      const response1 = await brandController.postBrand(brand);
      expect(response1.statusCode).toEqual(422);

      // 2nd request
      const response2 = await brandController.postBrand(brand);

      expect(response2.statusCode).toEqual(422);
      expect(response2.body.error).toContain("already exist");
    });
  });

  describe("Fetch individual brand", () => {
    describe("GET by brand/:id", () => {
      let postBrand;

      const brand = {
        name: "Test Brand" + Math.floor(Math.random() * 100000),
        description: "Test Brand Description",
      };

      beforeAll(async () => {
        postBrand = await brandController.postBrand(brand);
      });

      it("Business logic - GET invalid brand/:id", async () => {
        const response = await brandController.getBrandById(config.invalidBrandId[0]);
        expect(response.statusCode).toEqual(404);
        expect(response.body.error).toContain("Brand not found.");
      });

      it("GET by brand/:id", async () => {
        const response = await brandController.getBrandById(postBrand.body._id);
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual(postBrand.body.name);
      });
    });
  });

  describe("Update brand", () => {
    let postBrand;
    let updatedBrand;

    const brand = {
      name: "Test Brand" + Math.floor(Math.random() * 100000),
      description: "Test Brand Description",
    };
    beforeAll(async () => {
      postBrand = await brandController.postBrand(brand);
    });

    afterAll(async () => {
      await brandController.deleteBrands(postBrand.body._id);
    });

    it("Update brand using PUT method", async () => {
      updatedBrand = await brandController.putBrands(postBrand.body._id, brand);

      expect(updatedBrand.statusCode).toEqual(200);
      expect(updatedBrand.body.name).toEqual(brand.name);
    });

    it("Update brand name with over 30 characters", async () => {
      const brandLongString = {
        name: "This is a string that is definitely over thirty characters long.",
      };

      const errorMessage = {
        error: "Brand name is too long",
      };

      const response = await brandController.putBrands(
        postBrand.body._id,
        brandLongString
      );

      expect(response.statusCode).toEqual(422);
      expect(response.body).toEqual(errorMessage);
      expect(typeof response.body.error).toBe("string");
    });

    it("Business logic - throw error updating invalid brand", async () => {
      const brand = {
        name: "invalid brand",
      };
      const errorMessage = {
        error: "Unable to update brands",
      };
      const response = await brandController.putBrands(
        "643fc976bf61a969820eb7boo",
        brand
      );

      expect(response.statusCode).toEqual(422);
      expect(response.body).toEqual(errorMessage);
    });
  });
});

describe("Delete brand", () => {
  let postBrand;
  const brand = {
    name: "Test Brand" + Math.floor(Math.random() * 100000),
    description: "Test Brand Description",
  };
  beforeAll(async () => {
    postBrand = await brandController.postBrand(brand);
  });
  it("Delete brand using DELETE method", async () => {
    const response = await brandController.deleteBrands(postBrand.body._id);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(null);
  });
  it("Business logic - throw error deleting invalid brand", async () => {
    const errorMessage = {
      error: "Unable to delete brand",
    };

    const response = await brandController.deleteBrands("643fc976bf61a969820eb7boo");

    expect(response.statusCode).toEqual(422);
    expect(response.body).toEqual(errorMessage);
  });
});
