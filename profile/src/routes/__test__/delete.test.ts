import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/profiles/${id}`)
    .set("Cookie", global.signin())
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/profiles/${id}`).expect(401);
});

it("deletes the profile if it exists and the user is authenticated", async () => {
  const name = "John Doe";
  const biography = "Lorem ipsum";
  const phoneNumber = "123456789";
  const location = "United States";
  const portfolio = [
    { image: "example.jpg", description: "Example portfolio item" },
  ];

  // Create a profile
  const createResponse = await request(app)
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

  // Delete the profile
  await request(app)
    .delete(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin())
    .expect(204);

  // Fetch the deleted profile
  const fetchResponse = await request(app)
    .get(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin())
    .expect(404);
  console.log(createResponse.body.id);
});

it("returns a 404 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin())
    .expect(404);
});
