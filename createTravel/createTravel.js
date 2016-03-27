/**
 * Created by yijaejun on 2016. 3. 25..
 */

if(Meteor.isClient) {

    Template.createTravel.events({
        'submit form': function (event) {
            event.preventDefault();
            var busService = {
                name: event.target.name.value,
                agency: event.target.agency.value,
                seats: parseInt(event.target.seats.value, 10),
                source: event.target.startpoint.value,
                destination: event.target.endpoint.value,
                startDateTime: new Date(event.target.startdate.value+""+event.target.starttime.value),
                endDateTime: new Date(event.target.enddate.value+""+event.target.endtime.value),
                fare: event.target.fare.value
            };

            if(busService.startDateTime.getTime() > busService.endDateTime.getTime()){
                $(event.target).find('.error').html("start time  is greater than end time");
                return false;
            }

            // error가 날 경우 result는 undefined, result가 있는 경우 error가 undefined
            Meteor.call('createBusService', busService, function (error, result){
                if(error){
                    $(event.target).find('.error').html(error.html);
                }else{
                    Router.go("home");
                }
            });
        }
    });



}