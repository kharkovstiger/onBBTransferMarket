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
            $scope.seasons.push({
                'season':i,
                'stat': data
            });
        });
    }

    var round=function(n){
        return Math.round(n*100)/100;
    };

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    };

    $scope.sort=function (season) {
        switch ($scope.propertyName) {
            case 'season':
                return $scope.propertyName;
            default:
                return season.stat[$scope.propertyName];
        }
    };
}]);