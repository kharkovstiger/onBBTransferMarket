var app = angular.module('obbtm', ['ngCookies']);

app.controller('obbtmCtrl', ['$cookies', '$scope','$http', function($cookies, $scope, $http) {

    // var baseURL='http://localhost:8080/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    var NTIds=[39613679, 40457235];

    $scope.tl=[];

    // $http.get(baseURL+'/login?login=lnrstgr&code=katana').then(
    $http.get(baseURL+'/login.aspx?login=lnrstgr&code=katana').then(
        function (response) {
            console.log(response.status+", "+response.data);
            console.log(response.headers);
            console.log($cookies.ASP.NET_SessionId);
            console.log($cookies.get('.ASPXAUTH'));
            console.log($cookies.ASPXAUTH);

        },
        function (response) {
            console.log(response.status+", "+response.data);
        }
    );

    $scope.getTLforNT=function () {
        console.log($cookies.getAll());
        for (var i=0;i<NTIds.length;i++){
            $http.get(baseURL+'/player.aspx?playerid='+NTIds[i]).then(
                function (response) {
                    console.log(response.status+", "+response.data);
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    }
}]);