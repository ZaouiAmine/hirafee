import request from "supertest";
import { app } from "../../app";
import { Ban } from "../../models/ban";

it("has a route listening for /api/bans for post requests", async () => {
  const response = await request(app).post("/api/bans").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).post("/api/bans").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is an admin", async () => {
  const response = await request(app)
    .post("/api/bans")
    .set("Cookie", global.signin("admin"))
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for missing userId or reason", async () => {
  await request(app)
    .post("/api/bans")
    .set("Cookie", global.signin("admin"))
    .send({ reason: "Some reason" })
    .expect(400);

  await request(app)
    .post("/api/bans")
    .set("Cookie", global.signin("admin"))
    .send({ userId: "12345" })
    .expect(400);
});

it("creates a ban with valid inputs", async () => {
  let bans = await Ban.find({});
  expect(bans.length).toEqual(0);

  await request(app)
    .post("/api/bans")
    .set("Cookie", global.signin("admin"))
    .send({ userId: "12345", reason: "Some reason" })
    .expect(201);

  bans = await Ban.find({});
  expect(bans.length).toEqual(1);
});
