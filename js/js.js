var app = angular.module('obbtm', ['ngCookies']);

app.controller('obbtmCtrl', ['$cookies', '$scope','$http', function($cookies, $scope, $http) {

    $scope.register=false;
    $scope.isDisable=false;

    var myLocalBaseURL='http://localhost:8080/api';
    var myBaseURL='https://forbb.herokuapp.com/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    var NTIds=[33959724,30156569,31128996,31128671,33080423,33080377,33959713,34775441,41271620,
        36441708,37246533,33080145,33080700,37246076,32180287,33080896,33959834,37246080,34775421,35622109,36442102,
        31128733,35622409,38859223,38859214,38859480,41271156,39613051,33080963,33959722,38860110,40457791,36441813,
        28893933,38058817,37246981,38058726,40457364,40457183,37246468,37246738,41271049,31128951,32180726,32180039,
        32180130,32180467,32180370,33080860,34775319,34775465,35622299,34776111,36441785,36441816,35622657,37246528,
        36441703,36441734,38058454,37246156,37246160,37246198,38058689,38059022,38058548,38058407,38859177,38058858,
        38058509,38859342,38058691,38859921,38859744,39613281,38859763,39613196,40457215,39613587,39613679,39613127,
        41270823,40457553,40457736,41270777,41271135,40457235,41270874,41270889,41270791,40457506,40457399,40457663,
        40457980,37246351,37246287,39613585,38058584,40457358,40457571,40457427,41270990,40457336];
    var U21Ids=[];

    $scope.tl=[];

    $scope.log=function () {
        $scope.isDisable=true;
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
        $scope.tl=[];
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