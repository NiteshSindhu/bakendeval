const express = require("express");
const { connection } = require("./config/db");
const { userRoutes } = require("./Routes/user.route");
require("dotenv").config();
const cors = require("cors");
const { postRoutes } = require("./Routes/post.route");
const { authentication } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/",(req, res)=> {
    res.send("home page")
})
app.use("/users", userRoutes);
app.use(authentication);
app.use("/posts", postRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`listen at the port ${process.env.PORT}`);
  } catch (err) {
    console.log("Error listening the port");
  }
});
