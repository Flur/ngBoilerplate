angular.module('myModule').controller('friendsCtrl', ['$scope', '$http', '$stateParams',  
    'myService', '_pageTitle', '_appUser', '$modal', friendsCtrl]);

function friendsCtrl($scope, $http, $stateParams, myService, _pageTitle, _appUser, $modal) {

  $scope.searchFilter = {};
  $http.get('http://api.ember-cli-101.com/api/friends').success(function(data) {
    $scope.friends = data.friends;
  });

  // friends = resourceFactory.query();
  // console.log(friends);

  $scope.modal = function() {
    myService.showModal({
      title: 'This is a modal window',
      message: 'Please click a button'
    });
  };

}


// TODO THIS RESOURSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// angular.module('myModule').factory('resourceFactory', [function($resource) {
//    return $resource('http://api.ember-cli-101.com/api/:name',{name:'friends'});
// }]);


angular.module('myModule').service('myService',['$modal', 
  function($modal) {

    var modalSettings = { 
        templateUrl: 'myModule/modal.tpl.html',
        backdrop: true,
        keyboard: true,
        modalFade: true
    };

    this.showModal = function(settings) {

      modalSettings.controller = function($modalInstance, $scope) {
        $scope.title = settings.title;
        $scope.message = settings.message;

        $scope.close = function () {
          $modalInstance.close();
        };
      };
      return $modal.open(modalSettings).result;
    };

    
}]);

// yourMessageService.displayModal({
//     title: "This is a modal window",
//     message: "Please click a button.",
//     buttons: [
//         { id: 'ok', label: 'OK'},
//         { id: 'cancel', label: 'Cancel'},
//     ]
// }).then(function(buttonId){
//     console.log('You clicked the button', buttonId);
// });
