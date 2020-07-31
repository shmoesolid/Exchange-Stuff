
// handlebars file deals with item editing filling
// use this file for post/update/delete

// confirm loaded
$(document).ready( () => {

    // form element submission
    formElm.on('submit', function(event) {
        event.preventDefault();

        // dynamically create send object by serializing form data
        var sendObj = {};
        $.each(
            formElm.serializeArray(), 
            function(_, kv) {
                if (sendObj.hasOwnProperty(kv.name)) {
                    sendObj[kv.name] = $.makeArray(sendObj[kv.name]);
                    sendObj[kv.name].push(kv.value);
                }
                else
                    sendObj[kv.name] = kv.value;
            }
        );

        // handle put or post based on data
        if (sendObj.id) $.put("/api/item", sendObj).then(() => window.location.href = "/dashboard");
        else $.post("/api/item", sendObj).then(() => window.location.href = "/dashboard");
    });

    // go back to dashboard on cancel
    $('#cancel').on('click', function(event) {
        event.preventDefault();
        window.location.href = "/dashboard";
    });

    // run delete api
    $('#remove').on('click', function(event) {
        event.preventDefault();

        // quick confirm for delete
        if (!confirm( "Are you sure you want to delete item titled:\n'"+ inputTitle.val() +"'?"))
            return;

        $.ajax({
            method: "DELETE",
            url: "/api/item?id=" + inputID.val()
        }).then( () => window.location.href = "/dashboard" );
    });
});
