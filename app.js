/** @format */

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// Handles the Partials
hbs.registerPartials(__dirname + "/views/partials");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "project2";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

// 👇 Start handling routes here
//const pondriamos los routes o los archivos .js. Y en la linea 45, se pasan los Views que aparecerán/se mostrarán en esas Routes.
const index = require("./routes/index");
const authRoutes = require("./routes/auth");
const isLoggedIn = require("./middleware/isLoggedIn");
const profileRoutes = require("./routes/profile.router");
const postsRoutes = require("./routes/posts.router");
const commentsRoutes = require("./routes/comments");

app.use("/", index);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
