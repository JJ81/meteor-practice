Template.createTravel.events({
	"submit form": function (e) {
		e.preventDefault();
		//creating one object with all the properties set from user input
		var busService = {
			name: e.target.name.value,
			agency: e.target.agency.value,
			seats: parseInt(e.target.seats.value, 10),
			source: e.target.startpoint.value,
			destination: e.target.endpoint.value,
			startDateTime: new Date(e.target.startdate.value+" "+e.target.starttime.value),
			endDateTime: new Date(e.target.enddate.value+" "+e.target.endtime.value),
			fare: e.target.fare.value
		};
		//Checking if start time is greater than end time and throwing exception	
		if(busService.startDateTime.getTime() > busService.endDateTime.getTime()) {
			$(e.target).find(".error").html("Start time is greater than end time");
			return false;
		}
		//Server call to persist the data. 
		Meteor.call("createBusService", busService, function(error, result) {
			if(error) {
				$(e.target).find(".error").html(error.reason);
			} else {
				Router.go("/");	
			}
		});
	}
});