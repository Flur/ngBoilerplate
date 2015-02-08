angular.module('myModule').controller('friendsCtrl', ['$scope', '$http', '$stateParams', 
    '_pageTitle', '_appUser', friendsCtrl]);

function friendsCtrl($scope, $http, $stateParams, _pageTitle, _appUser) {

    $scope.params = $stateParams;


    $http.get('http://api.ember-cli-101.com/api/friends').success(function(data) {
    	$scope.some = data;
    });
}


