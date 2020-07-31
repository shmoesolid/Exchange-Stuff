
// our item info already passed and filled in handlebars file
// get all times based on our delcared iteme value that are not our own
// create a scroller

// confirm loaded
$(document).ready( () => {

    // references
    var compareElm = $('#compare-item');

    // dynamically loads new compare item into div
    // based on our item information
    function loadNewItem()
    {
        // ..
    }

    // listener for accepting trade
    $('#accept-trade').on('click', function(event) {
        event.preventDefaults();


    });

    // listener for refusing trade
    $('#refuse-trade').on('click', function(event) {
        event.preventDefaults();


    });

    // load new item on page load
    loadNewItem();

});