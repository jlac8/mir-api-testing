# Make It Real - API Unit Testing for Tasks and Assets

This is a solution to the **Unit Testing Exercise for API Services** project of the Make It Real course.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Interact with the `/api/tasks` and `/api/assets` endpoints, performing all CRUD operations (GET, POST, PUT, DELETE).
- Verify API responses for both successful and error scenarios using Vitest and Supertest.

## My process

### Built with

- **Node.js** and **Express.js** - For backend services
- **MongoDB** - As the database
- **Vitest** - For unit testing
- **Supertest** - For API request testing
- **RESTful API principles**

### What I learned

This project helped me strengthen my understanding of testing in a Node.js environment, specifically using Vitest and Supertest to test Express.js endpoints. I learned how to structure tests to cover both success and failure scenarios thoroughly and to isolate services from endpoint testing.

Here’s a sample test for the `/api/assets` endpoint:

```javascript
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("Assets API", () => {
  it("should get all assets", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

### Continued development

In future projects, I plan to explore more advanced testing practices, such as mocking database calls and using dependency injection for better test isolation. I also aim to experiment with using Vitest in larger codebases to test modularized services and controllers separately.

## Author

LinkedIn [Juan Alva](https://www.linkedin.com/in/juan-luis-alva/)

## Acknowledgments

Special thanks to the Make It Real team for providing guidance. This exercise provided a valuable opportunity to deepen my knowledge of API testing with modern tools.
