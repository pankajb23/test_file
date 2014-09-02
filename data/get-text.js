// panel-script.js

var url = " http://www.hackerearth.com/api/events/upcoming/";
var populateDiv = function(div, constant, json)
{
    for(i = 0, len = json.length; i < len; i++) {
        e = json[i];
        // finally got this much working.
        if( e.status == constant && (e.college == false) ) {
            document.getElementById(div).appendChild(createNode(e));
        }
    }
};
var reset = function()
{
    clearDiv("ongoing");
    //console.log("hello");
    clearDiv("upcoming");
};
var clearDiv = function (div)
{
    node = document.getElementById(div);
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
};
// create a new node for chrome extension.
var createNode = function (e)
{
    var element = document.createElement("div"),
        // to be modified
        str = "<div class='notification-item'>"+
              "<div class='sub-heading'>" +
              "<a href='" + e.url + "' target='_blank' class='underline-hover'>" + e.title + "</a>"+
              "</div>" +
              "Date: " + e.date +
              "<br/>" +
              " Time: " + e.time +
              "<br/>" +
              "Click " +
              "<a href='" + e.subscribe + "' target='_blank' class='underline-hover' >here</a>"+
              " to subscribe" +
              "</div>";

    element.innerHTML = str;
    return element;
};

self.port.on("show", function (){
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
        var json = JSON.parse(request.responseText);
        //console.log(jsonResponse);
        //console.log("hello pankaj");
        document.getElementById('indicator').style.display = 'none';
        reset();
        populateDiv("ongoing", "ONGOING", json);
        populateDiv("upcoming", "UPCOMING", json);
    };
});
