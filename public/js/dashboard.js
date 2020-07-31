
const TRADE_MAP = ["Pending","Accepted","Shipped","Completed"];

// get user trades
function populateUserTrades(page=1, limit=1)
{
    $.get("/api/trades",

        function(data)
        {
            // get reference and empty
            var refUserTrades = $('#user-trades');
            refUserTrades.empty();

            if (!data.length)
            {
                refUserTrades.html("No active trades...<br />Create a posting to browse for comparable trades!");
                return;
            }

            // get pager variables (for reuse)
            var p = getPagerVars(data.length, page, limit);

            // create pager top
            refUserTrades.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-trades'));

            // DEBUG
            //console.log("start/end", start, end);

            //console.log(data);

            // go through all trades received
            for (var i = p.start; i < p.end; i++) 
            {
                var item = $('<section>');
                item.addClass("user-trade");
                item.attr("data-id", data[i].id);
                item.attr("data-id1", data[i].itemID1);
                item.attr("data-id2", data[i].itemID2);

                item.html(
                    "<p>"+ data[i].title1 +"<br />Status: "+ TRADE_MAP[data[i].itemStatus1] +"</p>"
                    + "<img src='http://lorempixel.com/150/150/technics/"+i+"' />"
                    + "<p>"+ data[i].description1 +"</p>"
                    + "<p>-- vs --</p>"
                    + "<p>"+ data[i].title2 +"<br />Status: "+ TRADE_MAP[data[i].itemStatus2]  +"</p>"
                    + "<img src='http://lorempixel.com/150/150/technics/"+(i+5)+"' />"
                    + "<p>"+ data[i].description2 +"</p>"
                    + "<button class='cancel-trade'>Remove</button>"
                    + "<hr />"
                );

                refUserTrades.append(item);
            }

            // create pager bottom
            //refUserTrades.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-trades'));

            // listener for pager buttons
            $('.pager-button-trades').on("click",
                function(event)
                {
                    event.preventDefault();
                    var bRef = $(this);

                    // load new items based on button data
                    populateUserTrades(bRef.data('pg'), bRef.data('limit'))
                }
            );

            // listener for canceling a trade
            $('.cancel-trade').on("click",
                function(event)
                {
                    event.preventDefault();

                    // get vars
                    var currentTradeID = $(this).parent().data('id');
                    var item1 = $(this).parent().data('id1');
                    var item2 = $(this).parent().data('id2');

                    // quick confirm for delete
                    if (!confirm( "Are you sure you want to delete trade?"))
                        return;

                    // unflag both items
                    $.ajax({
                        method: "PUT",
                        url: "/api/item?id="+ item1 +"&flagged=false"
                    }).then(() => {
                        $.ajax({
                            method: "PUT",
                            url: "/api/item?id="+ item2 +"&flagged=false"
                        }).then(() => {

                            // delete trade
                            $.ajax({
                                method: "DELETE",
                                url: "/api/trade?id=" + currentTradeID
                            }).then( () => location.reload() );
                        });
                    });
                }
            );
        }
    );
}

// get items by user id
function populateUserItems(uid, page=1, limit=2)
{
    // DEBUG
    //console.log(uid, page, limit);

    // run API
    $.get("/api/items?userID="+ uid +"&flagged=false",

        function(data)
        {
            // get reference and empty
            var refUserItems = $('#user-items');
            refUserItems.empty();

            if (!data.length)
            {
                refUserItems.html("No items to list...<br />Click post to create one!");
                return;
            }

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
                    "<p>"+ data[i].title +"</p>"
                    + "<img src='http://lorempixel.com/150/150/technics/"+i+"' />"
                    + "<p>"+ data[i].description +"</p>"
                    + "<button class='user-item-edit'>Edit</button> - "
                    + "<button class='user-item-browse'>Browse</button>"
                    + "<hr />"
                );

                refUserItems.append(item);
            }

            // create pager bottom
            //refUserItems.append(generatePager(p.page_current, p.page_total, p.limit, 'pager-button-items'));

            // listener for edit button
            $('.user-item-edit').on("click", 
                function(event) 
                {
                    event.preventDefault();
                    var currentItemID = $(this).parent().data('id');
                    window.location.href = "/item?id=" + currentItemID;
                }
            );

            // listener for browse button
            $('.user-item-browse').on("click", 
                function(event) 
                {
                    event.preventDefault();
                    var currentItemID = $(this).parent().data('id');
                    window.location.href = "/browse?id=" + currentItemID;
                }
            );

            // listener for pager buttons
            $('.pager-button-items').on("click",
                function(event)
                {
                    event.preventDefault();
                    var bRef = $(this);

                    // load new items based on button data
                    populateUserItems(userID, bRef.data('pg'), bRef.data('limit'))
                }
            );
        }
    );
}

// initial page run
$(document).ready(() => {

    $('#create-listing').on("click", function(event) {
        event.preventDefault();
        window.location.href = "/item";
    });

    populateUserItems(userID);
    populateUserTrades();
})

