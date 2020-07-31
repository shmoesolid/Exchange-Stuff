
var db = require("../models");

var categoryNum = 10;
var userNum = 10;
var itemNum = 50;
var tradeNum = 15;

var categoryCount = 1;
var userCount = 1;
var itemCount = 1;
var tradeCount = 1;
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
                    level: 0
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
                    // make sure first user gets the first one
                    //if (uid == 1) itemsAvail.push(itemCount); // for trade
                    //else itemsUnavail.push(itemCount);
                    itemsAvail.push(itemCount);
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
        // get random available indexes
        var index1 = Math.floor(Math.random() * itemsAvail.length); // get random
        var id1 = itemsAvail.splice(index1,1)[0]; // get and remove
        itemsUnavail.push(id1); // put into unavail

        var index2 = Math.floor(Math.random() * itemsAvail.length);
        var id2 = itemsAvail.splice(index2,1)[0];
        itemsUnavail.push(id2); // put into unavail

        // confirm
        if (id1 == undefined || id2 == undefined)
        {
            console.log(index1, index2, id1, id2);
            cb();
            return;
        }

        // just do one for now under first user
        db.trade.create(
            {
                itemID1: id1,
                itemID2: id2,
                itemStatus1: 0,
                itemStatus2: 0
            }, 
        ).then(() => {
            db.item.update(
                {flagged:true},
                { where: { id: id1 } }
            ).then(() => {
                db.item.update(
                    {flagged:true},
                    { where: { id: id2 } }
                ).then(() => {
                    if (tradeCount < tradeNum)
                    {
                        tradeCount++;
                        tradeExecute();
                        return;
                    }

                    // we done
                    cb();
                });
            });
        });

        
    };

    // execute start
    categoryExecute();
};

module.exports = generateFakeData;
