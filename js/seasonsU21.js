app.controller('seasonsU21Ctrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();
    $scope.country=data.country.name;

    $scope.get=function () {
        $http.get(myBaseURL+'/bbapi/season?login='+data.login+'&code='+data.code).then(
            function (response) {
                var doc=$.parseXML(response.data);
                $scope.seasonNow=doc.getElementsByTagName('inProgress')[0].parentElement.getAttribute('id');
                $scope.seasons=[];
                for (var i=6;i<=$scope.seasonNow;i++){
                    request(i);
                }
            }
        );    
    };

    function request(i) {
        $http.post(myBaseURL+'/game/getSeasonsStatisticsForCountry/'+i, $scope.country+' U21').then(
            function (response) {
                return response.data;
            }
        ).then(function (data) {
            Object.keys(data).forEach(function (stat) {
                data[stat]=round(data[stat]);
            });
            data.fieldGoalsPercentage=$scope.percent(data.fieldGoals,data.fieldGoalsAttempts);
            data.threePointsPercentage=$scope.percent(data.threePoints,data.threePointsAttempts);
            data.freeThrowsPercentage=$scope.percent(data.freeThrows,data.freeThrowsAttempts);
            $scope.seasons.push({
                'season':i,
                'stat': data
            });
        });
    }

    var round=function(n){
        return Math.round(n*100)/100;
    };

    $scope.percent=function(n,m){
        return Math.round(n/m*1000)/10;
    };
    
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    };

    $scope.sort=function (season) {
        switch ($scope.propertyName) {
            case 'season':
                return season[$scope.propertyName];
            default:
                return season.stat[$scope.propertyName];
        }
    };
}]);