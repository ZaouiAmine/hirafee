import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${id}`)
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(401);
});

it("updates the profile if valid inputs are provided", async () => {
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

  const updatedName = "Updated Name";
  const updatedBiography = "Updated Biography";
  const updatedPhoneNumber = "Updated Phone Number";
  const updatedLocation = "Updated Location";
  const updatedPortfolio = [
    { image: "updated.jpg", description: "Updated Description" },
  ];

  // Update the profile
  const updateResponse = await request(app)
    .put(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin())
    .send({
      name: updatedName,
      biography: updatedBiography,
      phoneNumber: updatedPhoneNumber,
      location: updatedLocation,
      portfolio: updatedPortfolio,
    })
    .expect(200);

  // Assert the profile is updated
  expect(updateResponse.body.name).toEqual(updatedName);
  expect(updateResponse.body.biography).toEqual(updatedBiography);
  expect(updateResponse.body.phoneNumber).toEqual(updatedPhoneNumber);
  expect(updateResponse.body.location).toEqual(updatedLocation);
  //   expect(updateResponse.body.portfolio).toEqual(
  //     expect.objectContaining({
  //       // Specify the properties to check for equality
  //       title: updatedPortfolio.image,
  //       description: updatedPortfolio.description,
  //       // ... add other properties here
  //     })
  //   );
});

it("returns a 404 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin())
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(404);
});
