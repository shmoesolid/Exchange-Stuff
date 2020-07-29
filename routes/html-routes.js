
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
  app.get("/item/:id", function(req, res) {

    // if not logged, redirect to login
    if (!req.user)
      return res.redirect("/login");
    
    // show item form
    res.render("item", { user: req.user, itemID: req.params.id });
  });

  // browse other items by our selected item
  app.get("/browse/:id", function(req, res) {

    // if not logged, redirect to login
    if (!req.user)
      return res.redirect("/login");
    
    // show browse
    res.render("browse", { user: req.user, itemID: req.params.id });
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
