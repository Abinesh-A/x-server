const app = require("express")({
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  },
});
const Mongoose = require("mongoose");
require("dotenv/config");

Mongoose.connect(process.env.DB_ACCESS, () => {
  console.log("DB Connected...");
});
app.get("/", (req, res) => {
  res.send("Server running...");
});
const adduser_r = require("./routes/adduser");
app.use("/adduser", adduser_r);

app.listen(process.env.PORT || 8080, () => {
  console.log("server running...");
});
