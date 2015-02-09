angular.module('myApp', ['ui.router', 'myModule', 'templates', 'Atarnia.utils', 'ngResource', 'ui.bootstrap'])

    .config(['atarniaSettingsProvider', function (atarnia) {
        atarnia.apiAdapter.namespace = '/api/';
    }]);
