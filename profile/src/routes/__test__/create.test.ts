import request from "supertest";
import { app } from "../../app";
import { Profile } from "../../models/profile";

it("has a route listening for /api/profiles for post requests", async () => {
  const response = await request(app).post("/api/profiles").send({});
  expect(response.status).not.toEqual(404);
});
it("it can only be accessed if user is signs in ", async () => {
  const response = await request(app).post("/api/profiles").send({});
  expect(response.status).toEqual(401);
});
it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});
it("return an error for invalid name", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});
it("return an error for invalid biography", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdqfsdf",
      biography: "",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});
it("return an error for invalid phoneNumber", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdqsf",
      biography: "lorem",
      phoneNumber: "",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdqsf",
      biography: "lorem",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});
it("return an error for invalid location", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdqfqdsf",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdjkqmsjf",
      biography: "lorem",
      phoneNumber: "0561294776",
      portfolio: [],
    })
    .expect(400);
});

it("creates a profile with valid inputs", async () => {
  let profiles = await Profile.find({});
  expect(profiles.length).toEqual(0);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name: "fdjkqmsjf",
      biography: "lorem",
      phoneNumber: "456",
      location: "fjdlskqmjf",
      portfolio: [],
    })
    .expect(201);

  profiles = await Profile.find({});
  expect(profiles.length).toEqual(1);
});
it("", async () => {});
