
/** generatePager
 * generates pager HTML based on various params
 * 
 * @param {number} page 
 * @param {number} page_total 
 * @param {number} limit 
 * @param {string} buttonRef 
 */
function generatePager(page, page_total, limit, buttonRef='pager-button')
{
    // gens page button for reuse
    function pgBtn (text, pg) {
        return `<button class='${buttonRef}' data-pg='${pg}' data-limit='${limit}'>${text}</button>`;
    }

    // return our neat pager table TODO add limit select/option
    return ""
    
        // open
        + "<table class='pager-table' style='margin: 0 auto;'><tr>"

        // left arrows
        +   "<td align='right' style='min-width:35px;'>"
        +       ((page > 2) ? pgBtn("&lt;&lt;", 1) : "")
        +   "</td>"
        +   "<td align='right' style='min-width:35px;'>"
        +       ((page > 1) ? pgBtn("&lt;", (page-1)) : "")
        +   "</td>"

        // middle page numbers
        + `<td align='center' style='min-width:35px;'>${page} / ${page_total}</td>`

        // right arrows
        +   "<td align='left' style='min-width:35px;'>"
        +       ((page < page_total) ? pgBtn("&gt;", (page + 1)) : "")
        +   "</td>"
        +   "<td align='left' style='min-width:35px;'>"
        +       ((page < (page_total - 1)) ? pgBtn("&gt;&gt;", page_total) : "")
        +   "</td>"

        // close
        + "</tr></table>"
    ;
}

/** getPagerVars
 * simply runs the math for our pager system for reuseability
 * 
 * @param {number} dataLength 
 * @param {number} page 
 * @param {number} limit 
 */
function getPagerVars(dataLength, page, limit)
{
    var limitArray = [2, 5, 10, 25, 50, 100];
    var rtnObj = {};

    rtnObj.limit = Math.max(Math.min(limit, 100), 1);
    if (limitArray.indexOf(rtnObj.limit) == -1) rtnObj.limit = 5;

    rtnObj.page_total = Math.ceil(dataLength / rtnObj.limit);
    rtnObj.page_current = Math.max(Math.min(page, rtnObj.page_total), 1);
    rtnObj.start = (rtnObj.page_current-1) * rtnObj.limit;
    rtnObj.end = Math.min((rtnObj.page_current * rtnObj.limit), dataLength);

    return rtnObj;
}
