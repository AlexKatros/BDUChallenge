angular
	.module('Challenge', [])
	.controller('ChallengeController', ChallengeCtrl)
	.filter('DateFilter', dateFilter);

ChallengeCtrl.$inject = ['$http', '$scope'];

function ChallengeCtrl($http, $scope) {
	var cCtrl = this;
	console.log('Controller loaded!');
	cCtrl.welcomeMessage = 'Welcome to the challenge!';

	getShipmentData();

	//add shipment data to scope
	$http.get('/shipments').then(function (res) {
		$scope.shipments = res.data;
	});
}

// Custom date filter that removes entries older than 3 days
function dateFilter() {
	items = [];
	return function (items) {
		var result = [];
		var today = new Date().getTime();


		for (var i = 0; i < items.length; i++) {
			var timeFound = new Date(items[i].created_at);
			var dayDifference = (today - timeFound.getTime()) / (1000 * 3600 * 24);
			if (dayDifference < 3) {
				result.push(items[i]);
			}
		}
		return result;
	};
}

//===============================================================================================
//Add JSON data to MongoDB with POST requests
function getShipmentData() {
	$.getJSON(
		'https://automation.bigdaddyunlimited.com/tracking_data.json',
		function (data) {
			//Loop through json file and make a POST request for each index
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				$.ajax({
					type: 'POST',
					url: 'https://katros-bdu-challenge.herokuapp.com',
					data: JSON.stringify(obj),
					contentType: 'application/json',
					dataType: 'json',
					success: console.log('Updating Shipment Data'),
				});
			}
		}
	);
}
