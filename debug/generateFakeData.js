
var db = require("./models");

var categoryNum = 10;

var generateFakeData = function()
{
    for(var i = 0; i < categoryNum; i++)
    {
        db.category.create( { name: "Item Category " + i } );
    }
};

/*
db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
*/