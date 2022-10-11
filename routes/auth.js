const express = require("express");
const routes = express.Router();
const user = require("../models/users_module");

routes.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const usersschema = new user({
    userName: userName,
    password: password,
  });
  usersschema
    .save()
    .then((data) => {
      res.json({ DATA: data });
    })
    .catch((err) => {
      res.json({ ERROR: err });
    });
});

routes.get("/login", async (req, res) => {
  const { userName, password } = req.body;
  user
    .findOne({ userName: userName, password: password })
    .then((data) => {
      if (data) {
        res.json({ AUTH: true });
      } else {
        res.json({ AUTH: false });
      }
    })
    .catch((err) => {
      res.json({ ERROR: err });
    });
});
module.exports = routes;
