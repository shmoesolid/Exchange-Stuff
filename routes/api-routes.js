
var db = require("../models");
var Op = db.Sequelize.Op;
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

        // confirm authenticated TODO uncomment
        //if (!req.user) 
        //    return res.json({error:"Not authorized"});

        // setup where defaults
        var whereObj = {};
        var minV = maxV = 0;

        // add id if exists
        if (req.query.id) whereObj.id = req.query.id;

        // build min and max if exists
        if ((minV = parseInt(req.query.minValue)) >=0 
            && (maxV = parseInt(req.query.maxValue)) >= 0
        ) {
            var avg = (minV + maxV) / 2;
            whereObj = [ 
                {minValue: { [Op.lt]: avg } }, 
                {maxValue: { [Op.gt]: avg } }
            ];
        }

        // find all
        db.item
            .findAll(
                {
                    where: whereObj
                }
            ).then(function(results) {
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
