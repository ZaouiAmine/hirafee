import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the review is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/reviews/${id}`)
    .set("Cookie", global.signin("client"))
    .send({
      gigId: "gigId",
      rating: 4,
      comment: "Updated review",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/reviews/${id}`)
    .send({
      gigId: "gigId",
      rating: 4,
      comment: "Updated review",
    })
    .expect(401);
});

it("updates the review if valid inputs are provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisan = invalidId;
  const review1 = {
    artisan,
    createdAt,
    user: invalidId,
    rating,
    comment,
  };

  // Create a review
  const createResponse = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client"))
    .send(review1)
    .expect(201);

  const updatedRating = 5;
  const updatedComment = "Updated review";

  // Update the review
  const updateResponse = await request(app)
    .put(`/api/reviews/${createResponse.body.id}`)
    .set("Cookie", global.signin("admin"))
    .send({
      rating: updatedRating,
      comment: updatedComment,
    })
    .expect(200);

  // Assert the review is updated
  expect(updateResponse.body.rating).toEqual(updatedRating);
  expect(updateResponse.body.comment).toEqual(updatedComment);
});

it("returns a 404 if an invalid review ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisan = invalidId;
  const review1 = {
    artisan,
    createdAt,
    rating,
    comment,
  };
  await request(app)
    .put(`/api/reviews/${invalidId}`)
    .set("Cookie", global.signin("client"))
    .send(review1)
    .expect(404);
});
