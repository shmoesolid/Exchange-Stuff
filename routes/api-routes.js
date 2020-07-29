
var db = require("../models");
var Op = db.Sequelize.Op;
var passport = require("../config/passport");
var http = require("http");
var port = require('../server.js');

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
        //if (!req.user) 
        //    return res.json({error:"Not authorized"});

        // setup where defaults
        var whereObj = {};
        var minV = maxV = 0;

        // add item id and trader id if exists
        if (req.query.id) whereObj.id = req.query.id;
        if (req.query.userID) whereObj.userId = req.query.userID;

        // build min and max if exists
        if ((minV = parseInt(req.query.minValue)) >=0 
            && (maxV = parseInt(req.query.maxValue)) >= 0
        ) {
            var avg = (minV + maxV) / 2;
            whereObj.minValue = { [Op.lt]: avg };
            whereObj.maxValue = { [Op.gt]: avg };
        }

        // setup full object with limit and offset
        var fullObj = { where: whereObj };
        if (req.query.limit && !isNaN(req.query.limit = parseInt(req.query.limit))) 
            fullObj.limit = req.query.limit;
        
        if (req.query.offset && !isNaN(req.query.offset = parseInt(req.query.offset)))
            fullObj.offset = req.query.offset;

        // find all
        db.item
            .findAll( fullObj )
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

    // get user trades
    app.get("/api/trades", function(req, res) {

        // confirm authenticated
        if (!req.user) 
            return res.json({error:"Not authorized"});

        // set url for getting user items
        var url = 'http://localhost:'+ port +'/api/items?userID='+ req.user.id;

        // get those items first
        http.get(url, function(result) {
            var body = '';
            result.on('data', (chunk) => body += chunk);
            result.on('end', () => {

                // handle data parsing
                var itemData = JSON.parse(body);
                var idArray = itemData.map( (obj) => obj.id);

                // find user trades based on user items
                // TODO: get both items info
                // db.trade.findAll(
                //     {
                //         // include: [
                //         //     { model: db.item, as: 'itemID1' },
                //         //     { model: db.item, as: 'itemID2' }
                //         // ],
                //         // where: {[Op.or]: [ 
                //         //     { itemID1: idArray }, 
                //         //     { itemID2: idArray } 
                //         // ]}
                //     }
                // ).then(function(data) {
                //     res.json(data);
                // });

                // screw sequelize includes and associations and blah blah
                db.sequelize.query(
                    'SELECT'
                    +' `t`.`id`,'
                    +' `t`.`itemID1`,'
                    +' `t`.`itemID2`,'
                    +' `t`.`itemStatus1`, `t`.`itemStatus2`,'
                    +' `i1`.`title` as `title1`, `i2`.`title` as `title2`,'
                    +' `i1`.`description` as `description1`, `i2`.`description` as `description2`,'
                    +' `i1`.`userId` as `user1`, `i2`.`userId` as `user2`'
                    +' FROM `trades` `t`'
                    +' JOIN `items` `i1` ON `t`.`itemID1` = `i1`.`id`'
                    +' JOIN `items` `i2` on `t`.`itemID2` = `i2`.`id`'
                    +' WHERE'
                    +' `t`.`itemID1` IN ('+ idArray.join(',') +')'
                    +' OR'
                    +' `t`.`itemID2` IN ('+ idArray.join(',') +')'
                    +' GROUP BY `t`.`id`;',
                    { model: db.trade }
                ).then(function(data) {
                    res.json(data);
                });

            });
        });
    });
};
