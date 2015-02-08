angular.module('myModule').controller('friendsCtrl', ['$scope', '$http', '$stateParams', 
    '_pageTitle', '_appUser', friendsCtrl]);

function friendsCtrl($scope, $http, $stateParams, _pageTitle, _appUser) {


    $http.get('http://api.ember-cli-101.com/api/friends').success(function(data) {
    	$scope.friends = data.friends;
    });
}

// angular.module('myModule').factory('myFactory', [function() {
// 	return {
// 		parse: function(object) {
// 			var parsedArray = [];
// 			for (var i = 0 ; i < object.length ; i++) {
// 				parsedArray[i] = angular.fromJson(object[i]);
// 				console.log(parsedArray[i]);
// 			}
// 			return parsedArray;
// 		}
// 	}
// }])
