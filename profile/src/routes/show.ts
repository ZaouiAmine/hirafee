import express from "express";

const router = express.Router();

router.get("/api/profiles", (req, res) => {
  res.send("hello there");
});



export { router as showRouter };
