app.controller('opponentsU21Ctrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    $scope.opponents=[];
    $scope.country=data.country.name;

    var allCountries=[];

    $http.get(myBaseURL+'/bbapi/country?login='+data.login+'&code='+data.code).then(
        function (response) {
            var xml=$.parseXML(response.data).getElementsByTagName('country');
            for(var i=0;i<xml.length;i++){
                allCountries.push(xml[i].textContent);
            }
        }
    );

    $scope.get=function () {
        $scope.opponents=[];
        allCountries.forEach(function (country) {
            if (country!=$scope.country && country!='Utopia' && country!='Nations of Africa'){
                $http.post(myBaseURL+'/game/resultsForCountryAgainstCountry', [$scope.country+' U21', country+' U21']).then(
                    function (response) {
                        return response.data;
                    }
                ).then(function (result) {
                    result.name=country+' U21';
                    $scope.opponents.push(result);
                })
            }
        })
    };

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    };

    $scope.sort=function (opponent) {
        return opponent[$scope.propertyName];
    };
}]);