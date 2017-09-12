var successElement, fleetIdParam, deviceIdParam, totalfailCount, totalsuccessCount, requestUrl;
var barChartFailedMsgFleetName = [];
var barChartFailedMsgFleetCount = [];
var barChartFailedMsgDeviceName = [];
var barChartFailedMsgDeviceCount = [];

function fetchCountFailedMessages() {
    var failCount = 0;
    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        requestUrl = dash.api_url + "/analytics/fleet";
    }
    else {
        requestUrl = dash.api_url + "/analytics/devices";
    }

    var fleetFailed = { "fleet_ids": dash.fleet_ids, "status": "error", "event_type": "signing", "start_date": dash.startDate, "end_date": dash.endDate }

    if (dash.isError == 'dateError') return;

    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(fleetFailed),
        type: "POST",
        url: requestUrl
    }).done(function (data) {

        if (noDataCheck(data.data)) return; // null data check 


        for (var i = 0; i < data.data.length; i++) {
            failCount += Number(data.data[i].count);
        }
        totalfailCount = failCount;
        bindTotalSuccessFailCount();
        bindTotalSuccessFailPercentage();
        if (data.data.length == 0) {
            $('#chartTotalSuccessFailedPercentage').hide();
            $('#chartTotalSuccessFailedCount').hide();
        }
        else {
            $('#chartTotalSuccessFailedPercentage').hide();
            $('#chartTotalSuccessFailedCount').show();

        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
    });

}

function fetchCountSuccessMessages() {
    var successCount = 0;
    var fleetSuccess = {
        "fleet_ids": dash.fleet_ids,
        "status": "success", "event_type": "signing", "start_date": dash.startDate, "end_date": dash.endDate
    };

    if (dash.isError == 'dateError') return;

    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(fleetSuccess),
        type: "POST",
        url: dash.api_url + "/analytics/fleet"
    }).done(function (data) {

        if (noDataCheck(data.data)) return; // null data check 


        for (var i = 0; i < data.data.length; i++) {
            successCount += Number(data.data[i].count);
        }


        totalsuccessCount = successCount;
        bindTotalSuccessFailCount();
        bindTotalSuccessFailPercentage();


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
    });
}




function bindTotalSuccessFailCount() {

    var chart = bb.generate({
        size: {

            height: 315,
            width: 315
        },
        "data": {
            type: "donut",
            "columns": [
              ["Failed Messages", totalfailCount],
              ["Successful Messages", totalsuccessCount]
            ]
        },
        color: {
            pattern: [
             "orangered",
              "cadetblue"]
        },
        "point": {
            "show": false
        },
        "donut": {
            "label": {
                "format": function (value, ratio, id) {
                    return d3.format('')(value);
                }
            }
        },
        "bindto": "#chartTotalSuccessFailedCount"
    });
}



//Do nut chart for success and failed percentage
function bindTotalSuccessFailPercentage() {

    var chart = bb.generate({
        size: {
            height: 315,
            width: 315
        },
        "data": {
            type: "donut",
            "columns": [
              ["Failed Messages", totalfailCount],
              ["Successful Messages", totalsuccessCount]
            ]
        },
        color: {
            pattern: [
             "orangered",
              "cadetblue"]
        },
        "point": {
            "show": false
        },
        "bindto": "#chartTotalSuccessFailedPercentage"
    });
}

$(document).on("click", "#percentFailedNumberForChart", function (e) {
    $('#chartTotalSuccessFailedPercentage').hide();
    $('#chartTotalSuccessFailedCount').show();

});
$(document).on("click", "#percentFailedCountForChart", function (e) {
    $('#chartTotalSuccessFailedPercentage').show();
    $('#chartTotalSuccessFailedCount').hide();
});


dash.isError = null;
