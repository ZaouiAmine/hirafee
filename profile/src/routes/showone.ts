import express from "express";

const router = express.Router();

router.get("/api/profiles/:id_profile", (req, res) => {
  res.send("hello there i am one user");
});



export { router as showoneRouter };
