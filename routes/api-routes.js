
var db = require("../models");

module.exports = function(app) {

    // get all items
    app.get("/api/items", function(req, res) {

        // TODO make sure isAuthenticated

        db.item
            .findAll({})
            .then(function(results) {
                res.json(results);
            });
    });

    // get specific item
    app.get("/api/items/:id", function(req, res) {

        // TODO make sure isAuthenticated

        db.item
            .findOne({ where: { id: req.params.id }})
            .then(function(results) {
                res.json(results);
            });
    });

};
