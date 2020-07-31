
// our item info already passed and filled in handlebars file
// get all times based on our delcared iteme value that are not our own
// create a scroller

// confirm loaded
$(document).ready( () => {

    // make sure item obj exists, if not, go back to dashboard
    if (typeof myItemObj === 'undefined')
        return;//window.location.href = "/dashboard";

    // references
    var compareElm = $('#compare-item');
    var acceptButton = $('#accept-trade');
    var refuseButton = $('#refuse-trade');

    // "global"
    var currentCompareID = null;

    function getFirstAllowed(data, deniedList)
    {
        for (var i=0; i<data.length; i++)
        {
            var item = data[i];

            if (item.userId != userID)
            {
                if (deniedList.indexOf(item.id) === -1)
                    return item;
            }
        }

        return;
    }

    // dynamically loads new compare item into div
    // based on our item information
    function loadNewItem()
    {
        // empty out for new item to compare
        compareElm.empty();

        // use min and max values to get items
        $.get('/api/items?minValue='+ myItemObj.minValue +'&maxValue='+ myItemObj.maxValue,
            function(data)
            {
                // get first allowed item
                var currentItem = getFirstAllowed(data, myItemObj.deniedItems);
                console.log(currentItem);

                // no data received
                if (!currentItem)
                {
                    // show no more items string and back button
                    compareElm.html(
                        `<h3>No more items to compare</h3>`
                        +`<button onclick="window.location.href = '/dashboard';" >Finish</button>`
                    );
                    return;
                }

                // update global
                currentCompareID = currentItem.id;

                // show new item
                compareElm.html(
                    `<h3>${currentItem.title}</h3>`
                    +`<img src='http://lorempixel.com/150/150/technics' />`
                    +`<p>${currentItem.description}</p>`
                );
            }
        );
    }

    // listener for accepting trade
    acceptButton.on('click', function(event) {
        event.preventDefault();

        // create trade using api
        $.post("/api/trade",
            {
                itemID1: myItemObj.id,
                itemID2: currentCompareID
            }
        ).then(() => window.location.href = "/dashboard");
    });

    // listener for refusing trade
    refuseButton.on('click', function(event) {
        event.preventDefault();

        // add to local myItemObj.deniedItems array
        myItemObj.deniedItems.push(currentCompareID);

        // stringify and update item deniedItem
        $.ajax({
            method: "PUT",
            url: "/api/item?id="+ myItemObj.id +"&deniedItems="+ JSON.stringify(myItemObj.deniedItems)
        }).then(() => loadNewItem());
    });

    // load new item on page load
    loadNewItem();

});