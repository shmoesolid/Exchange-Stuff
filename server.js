
// env setup
require('dotenv').config(); // utilizes vars.env in root
var PORT = process.env.PORT || 8080;

// requires
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var db = require("./models");

// DEBUG
var genData = require("./debug/generateFakeData"); 

// express setup
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// route handling
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// sync db and start
db.sequelize.sync({ force: true }).then(function() {
  genData();
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
