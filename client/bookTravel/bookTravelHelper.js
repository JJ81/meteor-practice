Template.bookTravel.helpers({
	seatArrangement: function() {
		var arrangement = [],
			totalSeats = (this.bus || {}).seats || 0,
			blockedSeats = _.map(this.blockedSeats || [], function(item) {return item.seat}),
			reservedSeats = _.flatten(_.map(this.reservations || [], function(item) {return _.map(item.seatsBooked, function(seat){return seat.seat;});})),
			tmpIndex = 0;
			Session.set("blockedSeats", this.blockedSeats);
		arrangement[tmpIndex] = [];
		for(var l = 1; l <= totalSeats; l++) {
			arrangement[tmpIndex].push({
				seat: l, 
				blocked: blockedSeats.indexOf(l) >= 0 ? "blocked" : "", 
				reserved: reservedSeats.indexOf(l) >= 0 ? "reserved" : "",
			});
			if(l % 4 === 0 && l != totalSeats) {
				tmpIndex++;
				arrangement[tmpIndex] = arrangement[tmpIndex] || [];
			}
		}
		return arrangement;
	},
	middleRow: function () {
		return (this.seat % 2) === 0;
	}
});
Template.bookTravel.events({
	"click .busView__seat:not(.reserved):not(.blocked)": function (e) {
		e.target.classList.add("blocked");
		var seat = {
			bus: Template.currentData().bus._id,
			seat: parseInt(e.target.id.replace("seat", ""), 10),
			blockedBy: ""
		};
		Meteor.call("blockThisSeat", seat, function(err, result) {
			if(err) {
				e.target.classList.remove("blocked");
			} else {
				var blockedSeats = Session.get("blockedSeats") || [];
				blockedSeats.push(seat);
				Session.set("blockedSeats", blockedSeats);
			}
		});
	},
	"click #book": function() {
		var blockedSeats = Session.get("blockedSeats");
		if(blockedSeats && blockedSeats.length) {
			Meteor.call("bookMySeats", blockedSeats, function (error, result) {
				if(result) {
					Meteor.call("unblockTheseSeats", blockedSeats, function() {
						Session.set("blockedSeats", []);
					});
				} else {
					alert("Reservation failed");
					console.log(error);
				}
			});
		} else {
			alert("No seat selected");
		}
	}
});