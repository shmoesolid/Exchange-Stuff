
var db = require("../models");

var categoryNum = 10;
var userNum = 10;
var itemNum = 50;
//var tradeNum = 2;

var categoryCount = 1;
var userCount = 1;
var itemCount = 1;
//var tradeCount = 1;
var itemsAvail = [];
var itemsUnavail = [];

var generateFakeData = function(cb)
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
                    email: `${userCount}@mail.com`,
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
        var uid = Math.floor(Math.random() * 10)+1;

        db.item
            .create( 
                {
                    title: "title "+itemCount,
                    description: "this is a decription of item title "+itemCount,
                    minValue: Math.min(Math.floor(Math.random() * 100)+1, 20),
                    maxValue: Math.max(Math.floor(Math.random() * 100)+1, 50),
                    userId: uid
                }
            )
            .then( () => {
                if (itemCount < itemNum)
                {
                    if (uid == 1) itemsAvail.push(itemCount); // for trade
                    else itemsUnavail.push(itemCount);
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
        // just do one for now under first user
        db.trade.create(
            {
                itemID1: itemsAvail[Math.floor(Math.random() * itemsAvail.length)],
                itemID2: itemsUnavail[Math.floor(Math.random() * itemsUnavail.length)],
                itemStatus1: 0,
                itemStatus2: 0
            }, 
            /*{ 
                include: [ 
                    { model: db.item, as: 'itemID1' },
                    { model: db.item, as: 'itemID2' }
                ]
            }*/
        );

        cb();
    };

    // execute start
    categoryExecute();
};

module.exports = generateFakeData;
