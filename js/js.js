var app = angular.module('obbtm', ['ngCookies']);

app.controller('obbtmCtrl', ['$cookies', '$scope','$http', function($cookies, $scope, $http) {

    $scope.register=false;

    var myBaseURL='http://localhost:8080/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    var NTIds=[39613679, 40457235];

    $scope.tl=[];

    $scope.log=function () {
        console.log($scope.login);
        console.log($scope.code);
        $http.get(myBaseURL+'/login?login='+$scope.login+'&code='+$scope.code).then(
            // $http.get(baseURL+'/login.aspx?login=lnrstgr&code=katana').then(
            function (response) {
                console.log(response);
                console.log(response.data.getElementsByTagName('loggedIn'));
                if (response.data.getElementsByTagName('loggedIn').length>0) {
                    $scope.register = true;
                }
            },
            function (response) {
                console.log(response.status+", "+response.data);
            }
        );
    };

    $scope.getTLforNT=function () {
        console.log($cookies.getAll());
        for (var i=0;i<NTIds.length;i++){
            $http.get(myBaseURL+'/player?id='+NTIds[i]+'&login='+$scope.login+'&code='+$scope.code).then(
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