app.controller('teamsCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myLocalBaseURL='http://localhost:8080/api';
    var myBaseURL='https://forbb.herokuapp.com/api';
    var baseURL='http://bbapi.buzzerbeater.com';

    $scope.isDisable=false;
    var data=credentials.get();
    $scope.teams=[];
    var levels=0;

    $scope.reload=function () {
        $scope.isDisable=true;
        $scope.teams=[];
        $http.get(myBaseURL+'/country?login='+data.login+'&code='+data.code).then(
            function (response) {
                levels=$.parseXML(response.data).getElementById('33').getAttribute('divisions');
                for (var i=1;i<=levels;i++){
                    $http.get(myBaseURL+'/league?login='+data.login+'&code='+data.code+'&level='+i).then(
                        function (response) {
                            var leagues=$.parseXML(response.data).getElementsByTagName('league');
                            for(var j=0;j<leagues.length;j++){
                                $http.get(myBaseURL+'/standings?login='+data.login+'&code='+data.code+'&leagueid='+leagues[j].getAttribute('id')).then(
                                    function (response) {
                                        var team=$.parseXML(response.data).getElementsByTagName('team');
                                        for(var k=0;k<team.length;k++){
                                            if($.parseXML(response.data).getElementsByTagName('isBot')[k].textContent==0){
                                                $http.get(myBaseURL+'/team?login='+data.login+'&code='+data.code+'&id='+team[k].getAttribute('id')).then(
                                                    function (response) {
                                                        $scope.teams.push(teamConstructor($.parseXML(response.data)));
                                                    }
                                                );
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
                $scope.isDisable=false;
            }
        );
    };

    function teamConstructor(obj) {
        return {
            'id': obj.getElementsByTagName('team')[0].getAttribute('id'),
            'name': obj.getElementsByTagName('teamName')[0].textContent,
            'owner': obj.getElementsByTagName('owner')[0].textContent,
            'league': obj.getElementsByTagName('league')[0].textContent,
            'create': obj.getElementsByTagName('createDate')[0].textContent,
            'last': obj.getElementsByTagName('lastLoginDate')[0].textContent,
        };
    }

    var sort=null;

    $scope.sort=function (by) {
        switch (by){
            case 'name':
                if (sort===1) {
                    $scope.teams.sort(function (a, b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);} );
                    sort=1;
                }
                break;
            case 'league':
                if (sort===2) {
                    $scope.teams.sort(function(a,b) {return (a.league > b.league) ? 1 : ((b.league > a.league) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.league < b.league) ? 1 : ((b.league < a.league) ? -1 : 0);} );
                    sort=2;
                }
                break;
            case 'owner':
                if (sort===3) {
                    $scope.teams.sort(function(a,b) {return (a.owner > b.owner) ? 1 : ((b.owner > a.owner) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.owner < b.owner) ? 1 : ((b.owner < a.owner) ? -1 : 0);} );
                    sort=3;
                }
                break;
            case 'create':
                if (sort===4) {
                    $scope.teams.sort(function(a,b) {return (a.create > b.create) ? 1 : ((b.create > a.create) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.create < b.create) ? 1 : ((b.create < a.create) ? -1 : 0);} );
                    sort=4;
                }
                break;
            case 'last':
                if (sort===5) {
                    $scope.teams.sort(function(a,b) {return (a.last > b.last) ? 1 : ((b.last > a.last) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.last < b.last) ? 1 : ((b.last < a.last) ? -1 : 0);} );
                    sort=5;
                }
                break;
            default:
                break;
        }
    }
}]);