angular.module('myModule').controller('_LoginController', ['$scope', '$location', '_appUser', LoginController]);

function LoginController($scope, $location, _appUser) {

    $scope.username = null;
    $scope.password = null;
    $scope.error = null;
    $scope.user = null;

    // Load user
    _appUser.get().then(function(user){
        $scope.user = user;
    });

    // User actions
    $scope.login = function() {
        console.log('login action called');
        _appUser.login($scope.username, $scope.password).then(
            function(user){
                $scope.username = null;
                $scope.password = null;
                $scope.error = null;

                if (user.homePage) {
                    $location.path(user.homePage);
                }
            },
            function(reason){
                $scope.error = reason;
            }
        );
    };

    $scope.logout = function() {
        console.log('logout action called');
        _appUser.logout($scope.username, $scope.password).then(
            function(value){
                $scope.error = null;
            },
            function(reason){
                $scope.error = reason;
            }
        );
    };


}
