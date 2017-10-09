var app = angular.module('obbtm', []);

app.controller('obbtmCtrl', function ($scope, $http) {

    var baseURL='https://bbapi.buzzerbeater.com';

    var NTIds=[39613679, 40457235];

    $scope.tl=[];

    $http.get(baseURL+'/login.aspx?login=lnrstgr&code=katana').then(
        function (response) {
            console.log(response.status+", "+response.data);
        },
        function (response) {
            console.log(response.status+", "+response.data);
        }
    );

    $scope.getTLforNT=function () {
        for(var i=0;i<NTIds.length;i++){
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