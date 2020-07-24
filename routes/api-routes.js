
var db = require("../models");

module.exports = function(app) {

    // get all items
    app.get("/api/items", function(req, res) {
        res.end();
    });

};
