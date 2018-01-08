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
        .when("/nt", {
            templateUrl : "nt.html"
        })
        .when("/seasonsNT", {
            templateUrl : "seasonsNT.html"
        })
        .when("/u21", {
            templateUrl : "u21.html"
        })
        .when("/seasonsU21", {
            templateUrl : "seasonsU21.html"
        })
        .when("/titles", {
            templateUrl : "titles.html"
        })
        .when("/finals", {
            templateUrl : "finals.html"
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