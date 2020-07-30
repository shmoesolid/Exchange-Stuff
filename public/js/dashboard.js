
// get user trades
function populateUserTrades(page=1, limit=5)
{
    $.get("/api/trades",

        function(data)
        {
            // get reference and empty
            var refUserTrades = $('#user-trades');
            refUserTrades.empty();

            // get pager variables (for reuse)
            var p = getPagerVars(data.length, page, limit);

            // create pager top
            refUserTrades.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-trades'));

            // DEBUG
            //console.log("start/end", start, end);

            console.log(data);

            // go through all trades received
            for (var i = p.start; i < p.end; i++) 
            {
                var item = $('<section>');
                item.addClass("user-trade");
                item.attr("data-id", data[i].id);

                //console.log(JSON.stringify(data[i]));

                item.html(
                    "<p>ITEM1: "+ data[i].title1 +" STATUS: "+ data[i].itemStatus1 +"</p>"
                    + "<p>ITEM2: "+ data[i].title2 +" STATUS: "+ data[i].itemStatus2 +"</p>"
                    + "<hr />"
                );

                refUserTrades.append(item);
            }

            // create pager bottom
            refUserTrades.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-trades'));

            // listener for pager buttons
            $('.pager-button-trades').on("click",
                function(event)
                {
                    event.preventDefault();
                    var bRef = $(this);

                    // load new items based on button data
                    populateUserItems(uid, bRef.data('pg'), bRef.data('limit'))
                }
            );
        }
    );
}

// get items by user id
function populateUserItems(uid, page=1, limit=5)
{
    // DEBUG
    //console.log(uid, page, limit);

    // run API
    $.get("/api/items?userID="+ uid,

        function(data)
        {
            // get reference and empty
            var refUserItems = $('#user-items');
            refUserItems.empty();

            // get pager variables (for reuse)
            var p = getPagerVars(data.length, page, limit);

            // create pager top
            refUserItems.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-items'));

            // DEBUG
            //console.log("start/end", start, end);

            // go through all items received
            for (var i = p.start; i < p.end; i++) 
            {
                var item = $('<section>');
                item.addClass("user-item");
                item.attr("data-id", data[i].id);

                item.html(
                    "<img src='http://lorempixel.com/150/150/technics/"+i+"' />"
                    + "<p>"+ data[i].title +"</p>"
                    + "<p>"+ data[i].description +"</p>"
                    + "<button class='user-item-edit'>Edit</button> - "
                    + "<button class='user-item-browse'>Browse</button>"
                    + "<hr />"
                );

                refUserItems.append(item);
            }

            // create pager bottom
            refUserItems.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-items'));

            // listener for edit button
            $('.user-item-edit').on("click", 
                function(event) 
                {
                    event.preventDefault();

                    var currentItemID = $(this).parent().data('id');
                    console.log("clicked edit for: " + currentItemID);
                }
            );

            // listener for browse button
            $('.user-item-browse').on("click", 
                function(event) 
                {
                    event.preventDefault();

                    var currentItemID = $(this).parent().data('id');
                    console.log("clicked browse for: " + currentItemID);
                }
            );

            // listener for pager buttons
            $('.pager-button-items').on("click",
                function(event)
                {
                    event.preventDefault();
                    var bRef = $(this);

                    // load new items based on button data
                    populateUserItems(uid, bRef.data('pg'), bRef.data('limit'))
                }
            );
        }
    );
}

// initial page run
populateUserItems(userID);
populateUserTrades();
