app.controller('mainCtrl', ['$scope', '$http', 'credentials', '$rootScope', function($scope, $http, credentials, $rootScope) {

    var data=credentials.get();
    $scope.isDisable=false;
    $scope.updating=false;
    $scope.register = 'undefined' !== typeof data.login;

    var myBaseURL='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api';
    $rootScope.countries=['Ukraina', 'Belarus', 'Rossiya', 'Indonesia'];

    function checkIfGamesUpdated() {
        $http.get(myBaseURL2+'/isGamesUpdated').then(
            function (value) { 
                $scope.updated=value;
            }
        );
    }

    $scope.log=function () {
        $scope.isDisable=true;
        $http.get(myBaseURL+'/login?login='+$scope.login+'&code='+$scope.code+'&quickinfo=1').then(
            function (response) {
                console.log($.parseXML(response.data));
                console.log($.parseXML(response.data).getElementsByTagName('country')[0].getAttribute('id'));
                console.log($.parseXML(response.data).getElementsByTagName('country')[0].textContent);
                // if ($.parseXML(response.data).getElementsByTagName('loggedIn').length>0) {
                if ($.parseXML(response.data).getElementsByTagName('error').length===0) {
                    credentials.set({
                        'login':$scope.login,
                        'code':$scope.code,
                        'country':{
                            'name':$.parseXML(response.data).getElementsByTagName('country')[0].textContent,
                            'code':$.parseXML(response.data).getElementsByTagName('country')[0].getAttribute('id')
                        }
                    });
                    $scope.register = true;
                    checkIfGamesUpdated();
                }
            },
            function (response) {
                console.log(response.status+", "+response.data);
            }
        );
    };
    
    $scope.updateGames=function () {
        // $scope.updating=true;
        // $scope.updated=false;
        // $http.get(myBaseURL2+'/game/updateGames').then(
        //     function (response) {
        //         $scope.updating=false;
        //         $scope.updated=true;
        //     },
        //     function (response) {
        //         console.log(response.status+", "+response.data);
        //         $scope.updating=false;
        //     }
        // );
        $http.get('https://buzzerbeater.com/match/55576/boxscore.aspx').then(
            function (res) {
                console.log(res);
            },
            function (res) {
                console.log(res);
            }
        );
    }
}]);
