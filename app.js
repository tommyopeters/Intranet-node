const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  //
}
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//ROUTES
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/posts/", postRouter);

module.exports = app;
