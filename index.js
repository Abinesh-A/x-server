const app = require("express")({
  cors:{
      origin:"*",
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
      credentials: true
  }
});
require('dotenv/config');

app.get("/", (req, res) => {
  res.send("Server running");
});
app.get("/post", (req, res) => {
  res.send("From Post");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running...");
});
