
var http = require("http");
var port = require('../server.js');

function getItem(id, cb)
{
  var url = 'http://localhost:'+ port +'/api/items?id='+ id;

  // get that item
  http.get(url, function(result) {
    var body = '';
    result.on('data', (chunk) => body += chunk);
    result.on('end', () => cb(JSON.parse(body)) );
    result.on('error', (err) => cb({error: err}) );
  });
}

module.exports = function(app) {

  // index
  app.get("/", function(req, res) {

    // show index and pass user if exists
    res.render("index", (req.user) ? {user: req.user} : {});

  });

  // dashboard
  app.get("/dashboard", function(req, res) {

    // if not logged, redirect to login
    if (!req.user)
      return res.redirect("/login");
    
    // show dashboard
    res.render("dashboard", { user: req.user });
  });

  // create/edit/remove item page
  app.get("/item", function(req, res) {

    // if not logged, redirect to login
    if (!req.user)
      return res.redirect("/login");

    // just render without item data
    if (!req.query.id)
      return res.render("item", { user: req.user });

    // get item
    getItem(req.query.id, function(data) {

      var itemData = data[0];
      if (itemData.userId != req.user.id)
        itemData = { error: "Not Authorized" };

      res.render("item", { 
        user: req.user, 
        item: itemData 
      });
    });
  });

  // browse other items by our selected item
  app.get("/browse", function(req, res) {

    // if not logged, redirect to login
    if (!req.user)
      return res.redirect("/login");

    // just render without item data
    if (!req.query.id)
      return res.render("browse", { user: req.user });

    // get item
    getItem(req.query.id, function(data) {

      var itemData = data[0];
      if (itemData.userId != req.user.id)
        itemData = { error: "Not Authorized" };

      res.render("browse", { 
        user: req.user, 
        item: itemData
      });
    });
  });
  
  // login
  app.get("/login", function(req, res) {

    // if logged, redirect to main
    if (req.user) 
      return res.redirect("/dashboard");

    // show login
    res.render("login", {});
  });

  // sign up
  app.get("/signup", function(req, res) {

    // if logged, redirect to main
    if (req.user)
      return res.redirect("/dashboard");

    // show signup page
    res.render("signup", {});
  });

};
