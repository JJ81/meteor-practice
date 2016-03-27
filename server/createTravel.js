/**
 * Created by yijaejun on 2016. 3. 25..
 */

if(Meteor.isServer){
    // 디비 관련 메서드는 모두 서버단에 둔다.
    Meteor.methods({
        createBusService: function (busService){

            // 서버에서 validation을 체크하는 것을 좋다.
            if(!busService.name){
                throw new Meteor.Error("Name cannot be empty");
            }

            if(!busService.agency){
                throw new Meteor.Error("Agency cannot be empty");
            }

            if(!busService.seats){
                throw new Meteor.Error("Seats cannot be empty");
            }

            busService.createdAt = new Date();
            busService.updatedAt = null;
            busService.available_seats = parseInt(busService.seats, 10);
            BusServices.insert(busService);
        }
    });

    Meteor.publish("BusServices", function () {
        return BusServices.find({}, {sort: {createdAt: -1}});
    });
}
