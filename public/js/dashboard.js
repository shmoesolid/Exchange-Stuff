
// get items by user id
$.get("/api/items?userId="+ userID, 
    function(data)
    {
        // go through all items received
        for (var i = 0; i < data.length; i++) 
        {
            var item = $('<section>');
            item.addClass("user-item");
            item.attr("data-id", data[i].id);

            item.html(
                "<p>"+ data[i].title +"</p>"
                + "<p>"+ data[i].description +"</p>"
                + "<button class='user-item-edit'>Edit</button> - "
                + "<button class='user-item-browse'>Browse</button>"
                + "<hr />"
            );

            $('#user-items').append(item);
        }

        // listener for edit
        $('.user-item-edit').on("click", 
            function(event) 
            {
                event.preventDefault();
                var currentItemID = $(this).parent().data('id');
                console.log("clicked edit for: " + currentItemID);
            }
        );

        // listener for browse
        $('.user-item-browse').on("click", 
            function(event) 
            {
                event.preventDefault();
                var currentItemID = $(this).parent().data('id');
                console.log("clicked browse for: " + currentItemID);
            }
        );
    }
);
