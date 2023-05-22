import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log(JSON.stringify(req, null, 2));
  req.session = null;

  res.send("signed out");
});

export { router as signoutRouter };
