var app = angular.module('obbtm', []);

app.controller('obbtmCtrl', function ($scope, $http) {

    // var baseURL='http://localhost:8080/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    var NTIds=[39613679, 40457235];

    $scope.tl=[];

    // $http.get(baseURL+'/login?login=lnrstgr&code=katana').then(
    $http.get(baseURL+'/login.aspx?login=lnrstgr&code=katana').then(
        function (response) {
            console.log(response.status+", "+response.data);
            console.log(response.headers('set-cookie'));
        },
        function (response) {
            console.log(response.status+", "+response.data);
        }
    );

    $scope.getTLforNT=function () {
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
});