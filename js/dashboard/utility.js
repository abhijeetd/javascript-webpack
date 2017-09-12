		
	function showMessage(message) {
	throw new msgShow(message);  
	}

	function msgShow(msg) {	
	$('#msgShow').show();
	$('#msgShow').html(msg);		
	setTimeout(function(){$('#msgShow').fadeOut();}, 5000);
	setTimeout(function(){$('#load_failedMsgTable').fadeOut();}, 10);
	
	return;
	}
	
	
	function noDataCheck(dataArray) {	
	if(dataArray){	
	if( dataArray.length < 1 ){
	msgShow('There is no data respond from server for this request');
	return true;
	}	
	return false;
	}}
	
	function dateToday(){
	
	var today = new Date();
	//var hh = today.getHours();
	//var mn = today.getMinutes();
	var dd = today.getDate();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	dd='0'+dd;
	} 
	if(mm<10){
	mm='0'+mm;
	} 
	var today = yyyy+'-'+mm+'-'+dd;
	
	//2017-07-31T02:00*01/08/2017
	
	return 	today;
	
	}
	
	
	function validateDate() {
	
	/* validate the date */	
	if (!(Date.parse(dash.startDate)) || (!Date.parse(dash.endDate))) {	 
	 if(dash.hour == 'customDate')
	 //dash.hour = null;	
	 try {msgShow('Date input is required');} catch(e) {return;}
	 dash.isError = 'dateError';
	}else if ((Date.parse(dash.startDate)) > (Date.parse(dash.endDate))) {		
		try {msgShow('Start date should not be greater than To Date-Time');} catch(e) {return;}
		dash.isError = 'dateError';
	}else if ( Date.parse(dash.startDate) > Date.parse(dateToday()) ) {
		try {msgShow('To Date-Time should not be greater than current Date-Time')} catch(e) {return;}
		dash.isError = 'dateError';		
	}else if ( Date.parse(dash.endDate) > Date.parse(dateToday()) ) {
		try {msgShow('To Date-Time should not be greater than current Date-Time')} catch(e) {return;}
		dash.isError = 'dateError';		
	} 




}


	
	