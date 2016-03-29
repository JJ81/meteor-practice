Meteor.subscribe("BusServices");

var busServicesList = new ReactiveVar([]); // ??

// home템플릿이 생성될 때, BusServices에서 리스트를 조회하여 busServicesList에 담아놓는다.
// 담아놓는 이유는?
Template.home.onCreated(function() {
	busServicesList.set(BusServices.find({}));
});

// 데이터를 바인딩한다.
// 미리 담아놓은 데이터 개수를 체크하여 데이터를 바인딩할 수 있다.
Template.home.helpers({
    // 가져온 데이터를 담는다.
	list: function() {
        // TODO 여기서는 모든 데이터를 가져오는데 일부부만 지정해서 가져올려면 어떻게 해야 하는가?
		return busServicesList.get();
	},
    // 아이템이 있는 여부를 체크한다.
	hasItem: function() {
		return busServicesList.get().count();
	},
    // 이와 같은 부분은 공통으로 사용해도 될 부분이다.
	humanReadableDate: function (date) {
		var m = moment(date);
		return m.format("MMM,DD YYYY HH:mm");
	}
});

/**
 * 검색 영역 이벤트 바인딩
 * 검색 영역에서 키를 입력하기 시작하면 바로 조건 검색이 이루어진다.
 */
Template.travelSearch.events({
	"keyup input": _.debounce(function(e) { // 일정 시간이 지난 후에 실행이 된다 (200ms 경과후), 지연시간을 주는 이유는?
		var source = $("[name='startpoint']").val().trim(),
			destination = $("[name='endpoint']").val().trim(),
			date = $("[name='startdate']").val().trim(),
			fare = $("[name='fare']").val().trim(),
			search = {};

        // 검색 조건을 설정한다.
		if(source)
            search.source = {$regex: new RegExp(source), $options: "i"}; // 일치여부를 파악한다.

		if(destination)
            search.destination = {$regex: new RegExp(destination), $options: "i"};

		if(date) {
			var userDate = new Date(date);
            // 유저가 정한 날보다 크지만 어떤 날보다 작은 기간
			search.startDateTime = {
				$gte: userDate,
	        	$lte: new Date(moment(userDate).add(1, "day").unix()*1000) // ??
	    	}
    	}

		if(fare)
            search.fare = {$lte: fare};

        // 결과를 설정해주면 실시간으로 리스트가 변경된다. search를 통한 조건 검색
		busServicesList.set(BusServices.find(search, {sort: {createdAt: -1}}));

	}, 200)
});