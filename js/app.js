var app = angular.module('mybb', ['ngCookies', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "main.html"
        })
        .when("/transfer", {
            templateUrl : "transfer.html"
        })
        .when("/ukrteams", {
            templateUrl : "ukrteams.html"
        })
});

app.factory('credentials', function() {
    var savedData = {};

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});