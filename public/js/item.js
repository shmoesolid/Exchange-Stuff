
// handlebars file deals with item editing filling
// use this file for post/update/delete
/*
var formElm = $('#item-form');
    var inputID = $('#id');
    var inputTitle = $('#title');
    var inputDesc = $('#description');
    var inputMin = $('#minValue');
    var inputMax = $('#maxValue');
    var inputUserID = $('#userId');
*/

// confirm loaded
$(document).ready( () => {

    // form element submission
    formElm.on('submit', function(event) {
        event.preventDefault();

        // create form object send
        var sendObj = {};
        sendObj.id = inputID.val();
        sendObj.title = inputTitle.val();
        sendObj.description = inputDesc.val();
        sendObj.minValue = inputMin.val();
        sendObj.maxValue = inputMax.val();
        sendObj.userId = inputUserID.val();

        console.log(sendObj);

        // handle post
        $.post("/api/item", sendObj).then(() => window.location.href = "/dashboard");
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
