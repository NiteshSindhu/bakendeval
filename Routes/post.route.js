const express = require("express");
const { PostModel } = require("../models/post.model");

const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
    const query = req.query;
    try {
        await PostModel.find(query);
        res.send("All data")
    } catch (err) {
        res.send("Something went Wrong");
        console.log(err);
    }
})


postRoutes.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userId = post.userId;
  const user_userId = req.body.userId;
  try {
    if (userId != user_userId) {
      res.send({ msg: "You are not Authentication" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated the post");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});
postRoutes.delete("/delete /:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userId = post.userId;
  const user_userId = req.body.userId;
  try {
    if (userId != user_userId) {
      res.send({ msg: "You are not Authentication" });
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("Updated the post");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

postRoutes.post("/add", async (req, res) => {
  const data = req.body;
  try {
    await PostModel.insertMany(data);
    res.send("add");
  } catch (err) {
    res.send("Something went wrong");
  }
});

module.exports = { postRoutes };
