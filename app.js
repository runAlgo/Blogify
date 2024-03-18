require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./src/middlewares/authentication");

const Blog = require("./src/models/blog");

const userRoute = require("./src/routes/user");
const blogRoute = require("./src/routes/blog");

const app = express();
const PORT = process.env.PORT ?? 8000;

mongoose
  .connect('mongodb://localhost:27017')
  .then((e) => console.log("MongoDb connected!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
