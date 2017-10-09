var app = angular.module('obbtm', ['ngCookies']);

app.controller('obbtmCtrl', ['$cookies', '$scope','$http', function($cookies, $scope, $http) {

    $scope.register=false;

    var myLocalBaseURL='http://localhost:8080/api';
    var myBaseURL='https://forbb.herokuapp.com/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    var NTIds=[39613679, 40457235];
    var U21Ids=[];

    $scope.tl=[];

    $scope.log=function () {
        $scope.tl=[];
        $http.get(myBaseURL+'/login?login='+$scope.login+'&code='+$scope.code).then(
            // $http.get(baseURL+'/login.aspx?login=lnrstgr&code=katana').then(
            function (response) {
                // console.log(response.data);
                if ($.parseXML(response.data).getElementsByTagName('loggedIn').length>0) {
                    $scope.register = true;
                }
            },
            function (response) {
                console.log(response.status+", "+response.data);
            }
        );
    };

    $scope.getTLforNT=function () {
        $scope.tl=[];
        for (var i=0;i<NTIds.length;i++){
            $http.get(myBaseURL+'/player?id='+NTIds[i]+'&login='+$scope.login+'&code='+$scope.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    };

    $scope.getTLforNTU21=function () {
        $scope.tl=[];
        for (var i=0;i<U21Ids.length;i++){
            $http.get(myBaseURL+'/player?id='+U21Ids[i]+'&login='+$scope.login+'&code='+$scope.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    };

    $scope.getTLforList=function () {
        var list=$scope.ids.split(/[, \n]/);
        console.log(list);
        for (var i=0;i<list.length;i++){
            $http.get(myBaseURL+'/player?id='+list[i]+'&login='+$scope.login+'&code='+$scope.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    }
}]);