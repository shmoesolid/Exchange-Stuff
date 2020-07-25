
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    ////////////////////////////////////////////////////////////////////////////
    // SESSION HANDLING

    // login
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // signup completetion
    app.post("/api/signup", function(req, res) {
        db.user.create(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        .then(function() { res.redirect(307, "/api/login") } )
        .catch(function(err) { res.status(401).json(err) } );
    });

    ////////////////////////////////////////////////////////////////////////////
    // OTHER DATA HANDLING

    // get all items
    app.get("/api/items", function(req, res) {

        // confirm authenticated
        if (!req.user) 
            return res.json({error:"Not authorized"});

        // get data
        db.item
            .findAll({})
            .then(function(results) {
                res.json(results);
            });
    });

    // get specific item
    app.get("/api/items/:id", function(req, res) {

        // confirm authenticated
        if (!req.user) 
            return res.json({error:"Not authorized"});

        // get data
        db.item
            .findOne({ where: { id: req.params.id }})
            .then(function(results) {
                res.json(results);
            });
    });

    // get user info
    app.get("/api/user", function(req, res) {

        // confirm authenticated
        if (!req.user) 
            return res.json({error:"Not authorized"});

        // remove vital info
        delete req.user.password;
        delete req.user.tokenValidation;

        // send back data
        res.json(req.user);
    });
};
