var gridArrayData = [];

function fetchBarChartFleetDeviceFailedCount() {
    var failCount = 0;
    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        requestUrl = dash.api_url + "/analytics/fleet";

    }
    else {
        requestUrl = dash.api_url + "/analytics/devices";
    }
    var fleetFailed = { "fleet_ids": dash.fleet_ids, "status": "error", "event_type": "signing", "start_date": dash.startDate, "end_date": dash.endDate, "count": 10 }

	if (dash.isError == 'dateError') return;
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(fleetFailed),
        type: "POST",
        url: requestUrl
    }).done(function (data) {
	
	if(noDataCheck(data.data)) return; // null data check 

        for (var i = 0; i < data.data.length; i++) {
            if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
                barChartFailedMsgFleetName.push(data.data[i].fleet_id);
                barChartFailedMsgFleetCount.push(data.data[i].count);
            }
            else {
                barChartFailedMsgDeviceName.push(data.data[i].device_id);
                barChartFailedMsgDeviceCount.push(data.data[i].count);
            }
        }
        bindFailedMsgByFleetCount();
        bindFailedMsgByDeviceCount();
    }).fail(function (jqXHR, textStatus, errorThrown) {	
		//msgShow('Due to API call error request can not be processed');
        console.log(textStatus + ': ' + errorThrown);
		
		
    });

}

//Bar chart for FailedMsgByFleetCount
function bindFailedMsgByFleetCount() {
    var chart1 = bb.generate({
        bindto: "#chartFailedFleet",
        size: {
            height: 350,
            width: 700
        },
        data: {
            type: "bar",
            columns: [
             ['Fleet '].concat(barChartFailedMsgFleetCount)],
            onclick: function (e) { bindCellId() }
        },
        color: {
            pattern: [
           "orangered"]
        },
        point: {
            "show": false
        },        
        axis: {
            x: {
                type: 'category',
                categories: barChartFailedMsgFleetName,
                tick: {
                    "rotate": 15,
                    "multiline": false
                },

            },
            "y": {
                "label": {
                    "text": "Failed Count",
                    "position": "outer-middle"
                },
                size: {

                    width: 30
                },
            },
        }
    });
}

//Bar chart for FailedMsgByDeviceCount
function bindFailedMsgByDeviceCount() {
    var chart1 = bb.generate({
        bindto: "#chartFailedDevice",
        size: {
            height: 350,
            width: 700
        },
        data: {
            type: "bar",
            columns: [
               ['Device '].concat(barChartFailedMsgDeviceCount)]
        },
        color: {
            pattern: [
           "orangered"]
        },
        point: {
            "show": false
        },
        axis: {
            x: {
                type: 'category',
                categories: barChartFailedMsgDeviceName,
                tick: {
                    "rotate": 15,
                    "multiline": false
                },

            },
            "y": {
                "label": {
                    "text": "Failed Count",
                    "position": "outer-middle"
                },
                size: {

                    width: 30
                },
            },
        }
    });
}


//On click of grid and graph icon hide show grid and graph respectively
$(document).on("click", ".graph-icon", function (e) {
    $('#failed-msg-jqgrid').hide();
   
    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        $('#chartFailedFleet').show();
        
        $('#chartFailedDevice').hide();
    }
    else {
        $('#chartFailedFleet').hide();
        $('#chartFailedDevice').show();
    }
});

$(document).on("click", ".grid-icon", function (e) {
   
    $('#failed-msg-jqgrid').show();
    $('#chartFailedDevice').hide();
    $('#chartFailedFleet').hide();
});

function hideShowFleetColumn() {
    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        $('.fleetIdWidth').show();
        $('#chartFailedFleet').hide();
        $('#chartFailedDevice').hide();
       
        if ($(".refreshicon").data('clicked', true)) {
            if ($('#failed-msg-jqgrid').css('display') == 'none') {

                if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
                    $('#chartFailedFleet').show();
                    $('#chartFailedDevice').hide();
                }
                else {
                    $('#chartFailedFleet').hide();
                    $('#chartFailedDevice').show();
                }

            }
        }
    }
    else {

        if ($('#failed-msg-jqgrid').css('display') == 'none') {
            $('#failed-msg-jqgrid').hide();
            $('#chartFailedDevice').show();

        }
        else {
            $('#failed-msg-jqgrid').show();
        }
        $('.fleetIdWidth').hide();
        $('#chartFailedFleet').hide();


    }
}

//Bind Failed messages by device/fleet -jqgrid 		

$("#failedMsgTable").jqGrid({
    datatype: "local",
    height: 250,
    colModel: [
        {
            label: 'Device',
            name: 'Device',
            classes: 'devideIdWidth',
            sortable: false
        },
        {
            label: 'Fleet Id',
            name: 'FleetId',
            classes: 'fleetIdWidth',

            sortable: true,
            sorttype: "text"
        },
        {
            label: 'Count',
            name: 'Count',
            classes: 'countWidth',
            sorttype: "int",

        },
    ],
    viewrecords: true, // show the current page, data range and total records on the toolbar  
    datatype: 'local',

});

$("#selectFailedMessagesByDeviceOrFleet").change(function () {
    barChartFailedMsgFleetName = [];
    barChartFailedMsgFleetCount = [];
    barChartFailedMsgDeviceName = [];
    barChartFailedMsgDeviceCount = [];
    fetchGridDataForFleetsAndCount();
    fetchCountFailedMessages();
    fetchBarChartFleetDeviceFailedCount();
});

fetchGridDataForFleetsAndCount();
function fetchGridDataForFleetsAndCount() {
    var requestFailedMessagesByDeviceOrFleet = {
        "fleet_ids": dash.fleet_ids,
        "status": "error",
        "event_type": "signing",
        "start_date": dash.startDate,
        "end_date": dash.endDate,
        "count": 20
    }
    if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
        requestUrl = dash.api_url + "/analytics/fleet";
    }
    else {
        requestUrl = dash.api_url + "/analytics/devices";
    }

    // show loading message till api gets data
    //$("#failedMsgTable")[0].grid.beginReq();
	
	if (dash.isError == 'dateError') return;
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify(requestFailedMessagesByDeviceOrFleet),
        url: requestUrl,
        success: function (result) {
		
		if(noDataCheck(result.data)) return; // null data check 
		
            if ($('.jqgfirstrow').hasClass("slide-out-table-width")) {
                $('#failedMsgTable tr').addClass('slide-out-table-width')
                $('.ui-widget-content .jqgrow .ui-row-ltr').addClass("display-block");
                $('th#failedMsgTable_FleetId').addClass("jqgrid-fleetId-th-slideout");
            }
            else {
                $('#failedMsgTable tr').addClass("jqgrid-slidein-width");
                $('th#failedMsgTable_FleetId').addClass("jqgrid-fleetId-th-slidein");

            }
            gridArrayData = [];
            $('#failedMsgTable').jqGrid('clearGridData');
            if (result.data.length == 0) {
                //do not show # and % icons if not data to show
                $('#percentFailedCountForChart').hide();
                $('#percentFailedNumberForChart').hide();
                //do not jqgrid if not data to show
                $('#gbox_failedMsgTable').hide();
                $('#chartTotalSuccessFailedCount').hide();
                $('#chartFailedFleet').hide();
                $('#chartFailedDevice').hide();
                $('.noDataMsgForDate').show();
            }
            else {
                $('#percentFailedCountForChart').show();
                $('#percentFailedNumberForChart').show();
                $('#gbox_failedMsgTable').show();             
                $('.noDataMsgForDate').hide();
                if ($("#selectFailedMessagesByDeviceOrFleet option:selected").text() == 'Fleet') {
                    $('#failedMsgTable_Device').hide();
                    $('#failedMsgTable_FleetId').show();
                    $('.devideIdWidth').hide();
                    $('.fleetIdWidth').show();

                    for (var i = 0; i < result.data.length; i++) {
                        gridArrayData.push({
                            FleetId: result.data[i].fleet_id,
                            Count: result.data[i].count
                        });
                    }
                }
                else {
                    $('#failedMsgTable_Device').show();
                    $('#failedMsgTable_FleetId').hide();

                    for (var i = 0; i < result.data.length; i++) {
                        gridArrayData.push({
                            Device: result.data[i].device_id,
                            FleetId: result.data[i].fleet_id,
                            Count: result.data[i].count
                        });
                    }

                }
                $('.fleetIdWidth').hide();
            }
            // set the new data
            $("#failedMsgTable")[0].grid.endReq();
            $("#failedMsgTable").jqGrid('setGridParam', { data: gridArrayData });
            // refresh the grid                        

            $("#failedMsgTable").trigger('reloadGrid');
            hideShowFleetColumn();


        }
    });

}

//add classes while expanding or sliding out failed messaged for device section
$(document).on("click", ".expandIcon", function (e) {
    $('#successFailedTrendChart').hide();
    $('#failedFleets').addClass("width100");
    $('.ui-jqgrid-htable').addClass("fleet-jqgrid-htable");
    $('.ui-jqgrid-bdiv').addClass("expanded-div-fleet-scroll");
    $('#failedMsgTable tr').addClass("slide-out-table-width");
    $('#failedMsgTable tr').addClass("display-block");

    $('.collapseIcon').show();
    $('.expandIcon').hide();
})

$(document).on("click", ".collapseIcon", function (e) {
    $('#failedFleets').removeClass("width100");

    $('th#failedMsgTable_FleetId').addClass("jqgrid-fleetId-th-slidein");
    $('.ui-jqgrid-bdiv').removeClass("expanded-div-fleet-scroll");
    $('#successFailedTrendChart').show();
    $('.ui-jqgrid-htable').removeClass("fleet-jqgrid-htable");
    $('#failedMsgTable tr').removeClass("slide-out-table-width");
    $('#failedMsgTable tr').removeClass("display-block");
    $('.collapseIcon').hide();
    $('.expandIcon').show();
})



function dateError(msgDisplay) {
    $('#errorMsg').html("Error: End date & Start Date should not be later than now");
}

