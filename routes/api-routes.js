
var db = require("../models");

module.exports = function(app) {

    // get all items
    app.get("/api/items", function(req, res) {

        // confirm authenticated
        //if (!req.user) return res.json({});

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
        //if (!req.user) return res.json({});

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
        //if (!req.user) return res.json({});

        // remove vital info
        delete req.user.password;
        delete req.user.tokenValidation;

        // send back data
        res.json(req.user);
    });

};
