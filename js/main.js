app.controller('mainCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var data=credentials.get();
    $scope.isDisable=false;
    $scope.register = 'undefined' !== typeof data.login;

    var myBaseURL='https://forbb.herokuapp.com/api/bbapi';

    $scope.log=function () {
        $scope.isDisable=true;
        $http.get(myBaseURL+'/login?login='+$scope.login+'&code='+$scope.code).then(
            function (response) {
                // console.log(response.data);
                if ($.parseXML(response.data).getElementsByTagName('loggedIn').length>0) {
                    credentials.set({'login':$scope.login, 'code':$scope.code});
                    $scope.register = true;
                }
            },
            function (response) {
                console.log(response.status+", "+response.data);
            }
        );
    };
}]);