import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
<<<<<<< HEAD
  console.log("signout route");

=======
>>>>>>> origin/malak
  req.session = null;
  res.send("signed out");
});

export { router as signoutRouter };
