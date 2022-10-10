const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password)
  res.send(userName, password);
// res.send("auth")

});

module.exports = router;
