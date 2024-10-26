import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Tasks API", () => {
  it("should get all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a single task by ID", async () => {
    const taskId = 1;
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", taskId);
  });

  it("should return 404 for a non-existent task by ID", async () => {
    const taskId = 999;
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(404);
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "New task description",
    };
    const response = await request(app).post("/api/tasks").send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("title", newTask.title);
    expect(response.body).toHaveProperty("description", newTask.description);
    expect(response.body).toHaveProperty("completed", false);
  });

  it("should return 400 for creating a task with missing required fields", async () => {
    const incompleteTask = {
      title: "Incomplete Task",
    };
    const response = await request(app).post("/api/tasks").send(incompleteTask);
    expect(response.statusCode).toBe(400);
  });

  it("should update an existing task by ID", async () => {
    const taskId = 1;
    const updatedTask = {
      title: "Updated Task Title",
      description: "Updated description",
      completed: true,
    };
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", updatedTask.title);
    expect(response.body).toHaveProperty(
      "description",
      updatedTask.description
    );
    expect(response.body).toHaveProperty("completed", updatedTask.completed);
  });

  it("should return 404 for updating a non-existing task", async () => {
    const taskId = "999";
    const updatedTask = {
      title: "Non-existent Task",
      description: "Task description",
      completed: true,
    };
    const response = await request(app)
      .patch(`/api/assets/${taskId}`)
      .send(updatedTask);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 for updating a non-existent task", async () => {
    const taskId = 999;
    const updatedTask = {
      title: "Non-existent Task",
      description: "This task does not exist",
    };
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(updatedTask);
    expect(response.statusCode).toBe(404);
  });

  it("should delete a task by ID", async () => {
    const taskId = 2;
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 for deleting a non-existent task", async () => {
    const taskId = 999;
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(404);
  });
});
