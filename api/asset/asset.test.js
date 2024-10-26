import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Assets API", () => {
  it("should get all assets", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get an asset by id", async () => {
    const assetId = "1";
    const response = await request(app).get(`/api/assets/${assetId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", assetId);
  });

  it("should return 404 for a non-existing asset by id", async () => {
    const response = await request(app).get("/api/assets/999");
    expect(response.statusCode).toBe(404);
  });

  it("should get an asset by slug", async () => {
    const slug = "asset-1";
    const response = await request(app).get(`/api/assets/slug/${slug}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("slug", slug);
  });

  it("should return 404 for a non-existing asset by slug", async () => {
    const response = await request(app).get(
      "/api/assets/slug/non-existing-slug"
    );
    expect(response.statusCode).toBe(404);
  });

  it("should create a new asset", async () => {
    const newAsset = {
      name: "Asset 3",
      price: 150,
      slug: "asset-3",
      image: "https://via.placeholder.com/150",
    };
    const response = await request(app).post("/api/assets").send(newAsset);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name", newAsset.name);
    expect(response.body).toHaveProperty("price", newAsset.price);
    expect(response.body).toHaveProperty("slug", newAsset.slug);
    expect(response.body).toHaveProperty("image", newAsset.image);
  });

  it("should update an asset by id", async () => {
    const assetId = "1";
    const updatedAsset = {
      name: "Updated Asset Name",
      price: 120,
      slug: "updated-asset-slug",
      image: "https://via.placeholder.com/150",
    };
    const response = await request(app)
      .patch(`/api/assets/${assetId}`)
      .send(updatedAsset);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name", updatedAsset.name);
    expect(response.body).toHaveProperty("price", updatedAsset.price);
    expect(response.body).toHaveProperty("slug", updatedAsset.slug);
    expect(response.body).toHaveProperty("image", updatedAsset.image);
  });

  it("should return 404 for updating a non-existing asset", async () => {
    const assetId = "999";
    const updatedAsset = {
      name: "Non-existent Asset",
      price: 200,
      slug: "non-existent-asset",
      image: "https://via.placeholder.com/150",
    };
    const response = await request(app)
      .patch(`/api/assets/${assetId}`)
      .send(updatedAsset);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 for updating an asset with invalid data", async () => {
    const assetId = "1";
    const invalidAssetData = {
      name: "Invalid Asset",
      price: "not-a-number",
      slug: "invalid-asset",
    };
    const response = await request(app)
      .patch(`/api/assets/${assetId}`)
      .send(invalidAssetData);
    expect(response.statusCode).toBe(404);
  });

  it("should delete an asset by id", async () => {
    const assetId = "2";
    const response = await request(app).delete(`/api/assets/${assetId}`);
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 for deleting a non-existing asset", async () => {
    const assetId = "999";
    const response = await request(app).delete(`/api/assets/${assetId}`);
    expect(response.statusCode).toBe(404);
  });
});
