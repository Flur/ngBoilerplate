angular.module('Atarnia.auth').factory('_appUser', ['$q', '_apiAdapter', '$http', _appUser]);

function _appUser($q, _apiAdapter, $http){
    console.info('Initializing currentUserService');

    var userDeferred = $q.defer(),
        apiUrl = _apiAdapter.getApiUrl() + 'user/';

    console.log('apiUrl', apiUrl);

    // Define anonymous user
    var genericUser = {
        name: 'Anonymous',
        isAuthenticated: false,
        permissions: []
    };

    genericUser.hasPermission = function(permission) {
        return user.permissions.indexOf(permission) > -1;
    };

    // Create an application user object
    var user = angular.copy(genericUser);

    // Load the current user when the service is instantiated
    loadUser();

    // Define service API
    return {
        get: getUser,
        login: login,
        logout: logout
    };

    function getUser(name) {
        return userDeferred.promise;
    }

    function loadUser(){
        console.log('Loading user from API');
        $http.get(apiUrl).
            success(function(data, status, headers, config) {
                user = angular.extend(user, data);
                userDeferred.resolve(user);
            }).
            error(function(data, status, headers, config) {
                userDeferred.reject('Failed to load user data. Server responded with status:', status);
            });
        return userDeferred.promise;
    }

    function login(username, password) {
        userDeferred = $q.defer();
        $http.post(apiUrl, {username: username, password: password}).
            success(function(data, status, headers, config) {
                user = angular.extend(user, data);
                userDeferred.resolve(user);
            }).
            error(function(data, status, headers, config) {
                userDeferred.reject(data);
            });
        return userDeferred.promise;
    }

    function logout() {
        userDeferred = $q.defer();
        $http.delete(apiUrl).
            success(function(data, status, headers, config) {
                // Clear user data
                for (var field in user) { if (user.hasOwnProperty(field)) { delete user[field]; } }
                // Apply data from a generic user object
                user = angular.extend(user, genericUser);
                userDeferred.resolve(user);
            }).
            error(function(data, status, headers, config) {
                userDeferred.reject(data);
            });
        return userDeferred.promise;
    }

}
