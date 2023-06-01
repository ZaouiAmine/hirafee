import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found ", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/profiles/${id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});
it("returns the profile if the profile is found", async () => {
  let name = "fdjqmsfj";
  let biography = "lorem";
  let phoneNumber = "4+51+425+";
  let location = "algeria";
  let portfolio = [{ image: "fdjkmqsf", description: "fjdklqsmf" }];

  const response = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name,
      biography,
      phoneNumber,
      location,
      portfolio,
    })
    .expect(201);

  const profileResponse = await request(app)
    .get(`/api/profiles/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(profileResponse.body.name).toEqual(name);
  expect(profileResponse.body.biography).toEqual(biography);
  expect(profileResponse.body.phoneNumber).toEqual(phoneNumber);
  expect(profileResponse.body.location).toEqual(location);
});
it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/profiles/${id}`).send({}).expect(401);
});

it("returns a 500 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});

it("returns the profile with a transformed ID", async () => {
  let name = "John Doe";
  let biography = "Lorem ipsum";
  let phoneNumber = "123456789";
  let location = "United States";
  let portfolio = [
    { image: "example.jpg", description: "Example portfolio item" },
  ];

  const response = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin())
    .send({
      name,
      biography,
      phoneNumber,
      location,
      portfolio,
    })
    .expect(201);

  const profileResponse = await request(app)
    .get(`/api/profiles/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(profileResponse.body.id).toBeDefined();
  expect(profileResponse.body._id).toBeUndefined();

  expect(profileResponse.body.name).toEqual(name);
  expect(profileResponse.body.biography).toEqual(biography);
  expect(profileResponse.body.phoneNumber).toEqual(phoneNumber);
  expect(profileResponse.body.location).toEqual(location);
});
