import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns all profiles", async () => {
  const profile1 = {
    name: "John Doe",
    biography: "Lorem ipsum",
    phoneNumber: "123456789",
    location: "United States",
    portfolio: [
      { image: "example1.jpg", description: "Example portfolio item 1" },
    ],
  };

  const profile2 = {
    name: "Jane Smith",
    biography: "Lorem ipsum dolor",
    phoneNumber: "987654321",
    location: "Canada",
    portfolio: [
      { image: "example2.jpg", description: "Example portfolio item 2" },
    ],
  };

  // Create two profiles
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile1)
    .expect(201);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile2)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  // Assert the response contains both profiles
  expect(response.body.length).toEqual(2);
  expect(response.body[0].name).toEqual(profile1.name);
  expect(response.body[0].biography).toEqual(profile1.biography);
  expect(response.body[0].phoneNumber).toEqual(profile1.phoneNumber);
  expect(response.body[0].location).toEqual(profile1.location);
  expect(response.body[0].portfolio[0].image).toEqual(
    profile1.portfolio[0].image
  );
  expect(response.body[0].portfolio[0].description).toEqual(
    profile1.portfolio[0].description
  );

  expect(response.body[1].name).toEqual(profile2.name);
  expect(response.body[1].biography).toEqual(profile2.biography);
  expect(response.body[1].phoneNumber).toEqual(profile2.phoneNumber);
  expect(response.body[1].location).toEqual(profile2.location);
  expect(response.body[1].portfolio[0].image).toEqual(
    profile2.portfolio[0].image
  );
  expect(response.body[1].portfolio[0].description).toEqual(
    profile2.portfolio[0].description
  );
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app).get("/api/profiles").send({}).expect(401);
});

it("returns an empty array if no profiles exist", async () => {
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

it("returns profiles in descending order of creation", async () => {
  const profile1 = {
    name: "John Doe",
    biography: "Lorem ipsum",
    phoneNumber: "123456789",
    location: "United States",
    portfolio: [
      { image: "example1.jpg", description: "Example portfolio item 1" },
    ],
  };

  const profile2 = {
    name: "Jane Smith",
    biography: "Lorem ipsum dolor",
    phoneNumber: "987654321",
    location: "Canada",
    portfolio: [
      { image: "example2.jpg", description: "Example portfolio item 2" },
    ],
  };

  // Create profile2 first, then profile1
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile2)
    .expect(201);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile1)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  // Assert the response contains profiles in descending order of creation
  expect(response.body.length).toEqual(2);
  expect(response.body[0].name).toEqual(profile2.name);
  expect(response.body[1].name).toEqual(profile1.name);
});

it("returns profiles with transformed IDs", async () => {
  const profile1 = {
    name: "John Doe",
    biography: "Lorem ipsum",
    phoneNumber: "123456789",
    location: "United States",
    portfolio: [
      { image: "example1.jpg", description: "Example portfolio item 1" },
    ],
  };

  const profile2 = {
    name: "Jane Smith",
    biography: "Lorem ipsum dolor",
    phoneNumber: "987654321",
    location: "Canada",
    portfolio: [
      { image: "example2.jpg", description: "Example portfolio item 2" },
    ],
  };

  // Create two profiles
  const response1 = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile1)
    .expect(201);

  const response2 = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send(profile2)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  // Assert the response contains profiles with transformed IDs
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
  expect(response.body[0].id).toEqual(response1.body.id);

  expect(response.body[1].id).toBeDefined();
  expect(response.body[1]._id).toBeUndefined();
  expect(response.body[1].id).toEqual(response2.body.id);
});
