import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
}, 10000);

it("returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
}, 10000);

it("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "f",
    })
    .expect(400);
}, 10000);

it("returns a 400 on missing password or email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "password",
    })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "",
    })
    .expect(400);
}, 10000);

it("returns a 400 on duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
}, 10000);

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
}, 10000);
