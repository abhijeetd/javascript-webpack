// application wide parameters setting
$(document).ready(function () {
    //Get Count failed/successful messages   
    setDateForAPI();
    fetchCountFailedMessages();
    fetchCountSuccessMessages();
    fetchGridDataForFleetsAndCount();
    fetchBarChartFleetDeviceFailedCount();
    var gridArrayData = [];

});


/* Safari detection */
var is_safari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
if (is_safari) {
    $('#totalFailedCount').addClass('safariLeftChart');
}
var dash = {

    //fleet ids setup here 

    fleet_ids: ["persistent-test-1", "persistent-test-2", "persistent-test-3", "persistent-test-4", "persistent-test-5", "persistent-test-6", "persistent-test-7", "persistent-test-8", "persistent-test-9", "persistent-test-10"],


    // API url for now its stage

    api_url: "http://oneid-reporting-api-stage.nqf3jr92gi.us-west-2.elasticbeanstalk.com/api/v1",


    // Start date
    startDate: null,

    // End Date

    endDate: null,

    isError: null,

    //Hours 

    hour: null

}


