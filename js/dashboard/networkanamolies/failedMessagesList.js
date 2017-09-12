//Get data for failed messages log - 3rd Graph onclick of fleet id - API consumed - List of Events
$(document).on("click", "#failedMsgTable tr", function (e) {

    $('.failedMsgDefaultMsg').hide();
    $('.failedMsgJSON').empty();
    $('.failedMsgTimeStamp').empty();

    function getDate(date) {
        var datearr = date.split(':');
        datearr.pop();
        return datearr.join(':');
    }

    var startDate = getDate(dash.startDate);
    var endDate = getDate(dash.endDate)


    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        fleetIdParam = $(this).closest("tr").find('td.fleetIdWidth').text();
        var requestData = { "fleet_id": fleetIdParam, "status": "error", "start_date": startDate, "end_date": endDate }
    }
    else {
        fleetIdParam = $(this).closest("tr").find('td.fleetIdWidth').text();
        deviceIdParam = $(this).closest("tr").find('td.devideIdWidth').text();
        var requestData = { "fleet_id": fleetIdParam, "device_id": deviceIdParam, "status": "error", "start_date": startDate, "end_date": endDate }
    }
    var delay = 150, timer = null;
    timer = setTimeout(function () {
        $(document).one("click", ".fleetIdWidth", function (e) {
            timer = setTimeout(function () {
                $('.deviceIdLabel').hide();
                $('.fleetLabel').show();
                $('.fleetDeviceLable').html(fleetIdParam);
                $('#listOfMessagesTable').show();
            }, delay);

        });
        $(document).one("click", ".devideIdWidth", function (e) {
            timer = setTimeout(function () {
                $('.fleetLabel').hide();
                $('.deviceIdLabel').show();
                $('.fleetDeviceLable').html(deviceIdParam);
                $('#listOfMessagesTable').show();

            }, delay);
        });
    }, delay);



    if (dash.isError == 'dateError') return;


    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify(requestData),
        url: dash.api_url + "/events"
    }).done(function (data) {
        if (noDataCheck(data.data)) return; /* null data check */

        var header = "<tr class='border-bottom'></tr>";
        var eTable;
        for (var i = 0; i < data.data.length; i++) {
            var listOfEvents = JSON.stringify(data.data[i])
            if (listOfEvents.toLowerCase().indexOf("error") >= 0) {
                eTable += "<tr class='failedMsgTimeAndJson error'>";
                eTable += "<td class='failedMsgTimeStamp'>" + data.data[i].timestamp + "</td>";
                eTable += "<td class='failedMsgJSON errorStatus'>" + listOfEvents + "</td>";
            }
            else {
                eTable += "<tr class='failedMsgTimeAndJson success'>";
                eTable += "<td class='failedMsgTimeStamp successTimeStamp'>" + data.data[i].timestamp + "</td>";
                eTable += "<td class='failedMsgJSON successStatus'>" + listOfEvents + "</td>";
            }
            eTable += "</tr>";

        }


        var trData = header + eTable;
        $('#listOfMessagesTable').html(trData);
        if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
            $('.deviceIdLabel').hide();
            $('.fleetLabel').show();
            $('.fleetDeviceLable').html(fleetIdParam);
        } else {
            $('.fleetLabel').hide();
            $('.deviceIdLabel').show();
            $('.fleetDeviceLable').html(deviceIdParam);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {


        console.log(textStatus + ': ' + errorThrown);
    });

});

//bindCellId function  -selects single fleet as of now - needs to be modified to select dynamic fleetid on bar cell value on click
function bindCellId() {
    $('.failedMsgDefaultMsg').hide();
    $('.failedMsgJSON').empty();
    $('.failedMsgTimeStamp').empty();

    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        fleetIdParam = $('#chartFailedFleet tspan').html();
    }

    var delay = 150, timer = null;
    timer = setTimeout(function () {
        $(document).one("click", "#chartFailedFleet tspan", function (e) {
            timer = setTimeout(function () {
                $('.deviceIdLabel').hide();
                $('.fleetLabel').show();
                $('.fleetDeviceLable').html(fleetIdParam);
                $('#listOfMessagesTable').show();
            }, delay);

        });
        $(document).one("click", ".devideIdWidth", function (e) {
            timer = setTimeout(function () {
                $('.fleetLabel').hide();
                $('.deviceIdLabel').show();
                $('.fleetDeviceLable').html(deviceIdParam);
                $('#listOfMessagesTable').show();

            }, delay);
        });
    }, delay);

    dash.isError == 'dateError';

    var requestData = { "fleet_id": fleetIdParam, "device_id": deviceIdParam, "status": "error" }//, "start_date": dash.startDate, "end_date": dash.endDate}   //, "device_id": deviceIdParam, "start_date":dash.startDate,"end_date":dash.endDate
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify(requestData),
        url: dash.api_url + "/events"
    }).done(function (data) {

        if (noDataCheck(data.data)) return; /* null data check */

        var header = "<tr class='border-bottom'></tr>";
        var eTable;

        for (var i = 0; i < data.data.length; i++) {
            var listOfEvents = JSON.stringify(data.data[i])
            if (listOfEvents.toLowerCase().indexOf("error") >= 0) {
                eTable += "<tr class='failedMsgTimeAndJson error'>";
                eTable += "<td class='failedMsgTimeStamp'>" + data.data[i].timestamp + "</td>";
                eTable += "<td class='failedMsgJSON errorStatus'>" + listOfEvents + "</td>";
            }
            else {
                eTable += "<tr class='failedMsgTimeAndJson success'>";
                eTable += "<td class='failedMsgTimeStamp successTimeStamp'>" + data.data[i].timestamp + "</td>";
                eTable += "<td class='failedMsgJSON successStatus'>" + listOfEvents + "</td>";
            }
            eTable += "</tr>";

        }
        var trData = header + eTable;
        $('#listOfMessagesTable').html(trData);

    }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log(textStatus + ': ' + errorThrown);
    });
}



// remove device/ fleet row icon
$(document).on("click", ".hideMsgList", function (e) {
    $('#listOfMessagesTable').hide();
    $('.hideListMsgHeader').hide();
    $('.failedMsgDefaultMsg').show();
})




//List of Messages Search textBox for key up event for 3rd chart 

$(document).on("keyup", "#myInput", function (e) {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("listOfMessagesTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});
