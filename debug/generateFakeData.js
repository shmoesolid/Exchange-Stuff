
var db = require("../models");

var categoryNum = 10;
var userNum = 10;
var itemNum = 50;
var tradeNum = 2;

var categoryCount = 1;
var userCount = 1;
var itemCount = 1;
var tradeCount = 1;

var generateFakeData = function()
{
    // item categories
    var categoryExecute = function()
    {
        db.category
            .create( { name: "Item Category " + categoryCount } )
            .then( () => {
                if (categoryCount < categoryNum) 
                {
                    categoryCount++;
                    categoryExecute();
                    return; 
                }
                
                userExecute();
            });
    };
    
    // users
    var userExecute = function()
    {
        db.user
            .create( 
                {
                    email: `email${userCount}@blah.com`,
                    password: "password",
                }
            )
            .then( () => {
                if (userCount < userNum) 
                { 
                    userCount++;
                    userExecute();
                    return; 
                }
                
                itemExecute(); 
            });
    };

    // items
    var itemExecute = function()
    {
        db.item
            .create( 
                {
                    title: "title "+itemCount,
                    description: "this is a decription of item title "+itemCount,
                    minValue: 5,
                    maxValue: 100,
                    userId: Math.floor(Math.random() * 10)+1
                }
            )
            .then( () => {
                if (itemCount < itemNum)
                {
                    itemCount++;
                    itemExecute();
                    return;
                }

                tradeExecute(); 
            });
    };

    // trades
    var tradeExecute = function()
    {
        // db.trade.create(
        //     {
        //         itemID1: 1,
        //         itemID2: 50,
        //         itemStatus1: 0,
        //         itemStatus2: 0
        //     }
        // );
    };

    categoryExecute();
};

module.exports = generateFakeData;
