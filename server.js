
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var db = require("./models");

var genData = require("./debug/generateFakeData"); // DEBUG

var PORT = process.env.PORT || 8080;

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "ju#s82$bd82g0!&*@$#$FG^*@SAn&2", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  genData();
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
