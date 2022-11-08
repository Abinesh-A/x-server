const express = require("express");
const app = express({
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  },
});
const mongoose = require("mongoose");
require("dotenv/config")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth_r = require("./routes/auth");

mongoose
  .connect(process.env.DB_ACCESS)
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", auth_r);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running...");
});
