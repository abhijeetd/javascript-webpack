onPageLoad();

// date & time filter option setup
$("#startDate, #endDate").datepicker({ dateFormat: 'yy-mm-dd' });
$("#startTime, #endTime").timepicker({ 'timeFormat': 'H:i' });
// date time selector

$("#dateTimeHourSel").change(function () {
    $('#gbox_failedMsgTable').show();
    $('.noDataMsgForDate').hide();

    if (this.value == 'customDate') { /* Date & Time Plugin */

        /* date default value set here */
        dash.hour = this.value;
        $(".custom").show();
    } else {
        dash.hour = this.value; //*
        dash.hour = $("#dateTimeHourSel").val();
        // hour parameters
        $(".custom").hide();
    }
});

// On click of GO button
$(".refreshIcon").bind("click", function () { /* GO button clicked */
    barChartFailedMsgFleetName = [];
    barChartFailedMsgFleetCount = [];
    barChartFailedMsgDeviceName = [];
    barChartFailedMsgDeviceCount = [];
    dash.isError = null;

    dash.hour = $("#dateTimeHourSel").val();
    if (dash.hour == 'customDate') {
        getDateForAPI();
    }
    else {
        setDateForAPI()
    }
    dash.hour = null;
    fetchGridDataForFleetsAndCount();
    fetchCountFailedMessages();
    fetchCountSuccessMessages();
    fetchBarChartFleetDeviceFailedCount();

});

// Utility Functions
// This call reads value from date input

function getDateForAPI() {
    var strDate;
    strDate = $("#startDate").val() + "T" + $("#startTime").val();
    dash.startDate = new Date(strDate).toISOString();
    console.log(dash.startDate);

    strDate = $("#endDate").val() + "T" + $("#endTime").val();
    dash.endDate = new Date(strDate).toISOString();
    console.log(dash.endDate);
    validateDate();
}

function setDateForAPI() {
    var endDate = new Date();
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    var hrs = $("#dateTimeHourSel").val();

    dash.endDate = new Date(endDate).toISOString();
    endDate.setHours(endDate.getHours() - hrs);
    dash.startDate = new Date(endDate).toISOString();
}

function onPageLoad() {

    $('.fleetLabel').hide();
    $('.deviceIdLabel').hide();
    $(".failedMsgTimeAndJson").hide();
    $('.failedMsgDefaultMsg').show();
    $('.failedPercentMsg').hide();
    $('.expandIcon').show();
    $('.collapseIcon').hide();
    $('.noDataMsgForDate').hide();
    $('#chartTotalSuccessFailedPercentage').hide();
}