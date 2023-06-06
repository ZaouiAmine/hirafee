import request from "supertest";
import { app } from "../../app";
import { Ban } from "../../models/ban";

it("has a route listening for GET requests to /api/bans", async () => {
  const response = await request(app).get("/api/bans");
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).get("/api/bans");
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is an admin", async () => {
  const ban = Ban.build({
    userId: "user-id",
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const response = await request(app)
    .get("/api/bans")
    .set("Cookie", global.signin("admin"));

  expect(response.status).not.toEqual(401);
});

it("returns a 401 if the user is not an admin", async () => {
  const ban = Ban.build({
    userId: "user-id",
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const response = await request(app)
    .get("/api/bans")
    .set("Cookie", global.signin("user"));

  expect(response.status).toEqual(401);
});

it("returns an array of bans if the user is an admin", async () => {
  const ban1 = Ban.build({
    userId: "user-id1",
    reason: "Reason 1",
    createdAt: new Date(),
  });
  const ban2 = Ban.build({
    userId: "user-id2",
    reason: "Reason 2",
    createdAt: new Date(),
  });
  await ban1.save();
  await ban2.save();

  const response = await request(app)
    .get("/api/bans")
    .set("Cookie", global.signin("admin"))
    .expect(200);

  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(ban1.id);
  expect(response.body[0].userId).toEqual(ban1.userId);
  expect(response.body[0].reason).toEqual(ban1.reason);
  expect(response.body[1].id).toEqual(ban2.id);
  expect(response.body[1].userId).toEqual(ban2.userId);
  expect(response.body[1].reason).toEqual(ban2.reason);
});
