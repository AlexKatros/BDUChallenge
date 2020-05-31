angular
	.module('Challenge', [])
	.controller('ChallengeController', ChallengeCtrl);

ChallengeCtrl.$inject = ['$http', '$scope'];

function ChallengeCtrl($http, $scope) {
	var cCtrl = this;
	console.log('Controller loaded!');
	cCtrl.welcomeMessage = 'Welcome to the challenge!';
	getShipmentData();

	$http.get('/shipments').then(function (res) {
		$scope.shipments = res.data;
	});
}

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
					url: 'http://localhost:3000',
					data: JSON.stringify(obj),
					contentType: 'application/json',
					dataType: 'json',
					success: console.log(obj),
				});
			}
			// var date = new Date();
			// var deletionDate = new Date(date.setDate(date.getDate() - 3));
			// db.shipments.remove({ insertDate: { $lt: deletionDate } });
		}
	);
}
