app.controller('seasonsNTCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    $http.get(myBaseURL+'/bbapi/season?login='+data.login+'&code='+data.code).then(
        function (response) {
            var doc=$.parseXML(response.data);
            $scope.seasonNow=doc.getElementsByTagName('inProgress')[0].parentElement.getAttribute('id');
            $scope.seasonNow=4;
            $scope.seasons=[];
            for (var i=3;i<=$scope.seasonNow;i++){
                $scope.seasons.push({
                    'season':i,
                    'stat':$http.post(myBaseURL+'/game/getSeasonsStatisticsForCountry/'+i, 'Ukraina').then(
                                    function (response) {
                                        return response.data;
                                    }
                                )
                });
                console.log($scope.seasons);
                console.log($scope.seasons[0].stat.$$state);
                console.log($scope.seasons[0].stat.$$state.value);
            }
        }
    );
    
}]);