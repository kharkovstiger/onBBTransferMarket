app.controller('ntCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();
    
    $scope.pentaDouble=0;
    $scope.quadroDouble=0;
    $scope.triplDouble=0;
    $scope.doubleDouble=0;
    $scope.twenty=0;
    $scope.games=[];
    $scope.players=[];

    $scope.getStats=function () {
        if ('undefined' !== typeof $scope.list)
            $scope.stats($scope.list.split(/[, \n]/));
        else
            $scope.stats();
    };

    $scope.stats=function(list) {
        $scope.pentaDouble=0;
        $scope.quadroDouble=0;
        $scope.triplDouble=0;
        $scope.doubleDouble=0;
        $scope.twenty=0;
        $scope.games=[];
        $scope.players=[];
        if ('undefined' !== typeof $scope.list)
            $http.post(myBaseURL+'/game/gamesForList',list).then(
                function (response) {
                    $scope.games=response.data;
                    $scope.games.forEach(function (value) { 
                        value.me=value.awayTeam.name==="Ukraina"?0:1;
                    });
                    $scope.request={
                        'games': $scope.games,
                        'country': 'Ukraina'
                    };
                    $http.post(myBaseURL+'/player/getPlayersStatForGameList', $scope.request).then(
                        function (response) {
                            $scope.players=response.data;
                            $scope.players.forEach(function (value) { 
                                value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);    
                                value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);    
                                value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);    
                            });
                        }
                    );
                }
            );
        else
            $http.post(myBaseURL+'/game/allGamesForCountry/false', 'Ukraina').then(
                function (response) {
                    $scope.games=response.data;
                    $scope.games.forEach(function (value) {
                        value.me=value.awayTeam.name==="Ukraina"?0:1;
                    });
                    $scope.request={
                        'games': $scope.games,
                        'country': 'Ukraina'
                    };
                    $http.post(myBaseURL+'/player/getPlayersStatForGameList', $scope.request).then(
                        function (response) {
                            $scope.players=response.data;
                            $scope.players.forEach(function (value) {
                                value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);
                                value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);
                                value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);
                            });
                        }
                    );
                }
            );
    };

    $scope.round=function(n){
        return Math.round(n*100)/100;
    };

    $scope.percent=function(n,m){
        return Math.round(n/m*1000)/10;
    };

    $scope.getAverages=function () {
        $http.post(myBaseURL+'/game/getAveragedStatistics', $scope.request).then(
            function (response) {
                $scope.average=response.data;
                Object.keys($scope.average).forEach(function (value) { 
                   $scope.average[value]=$scope.round($scope.average[value]); 
                });
                $scope.average.fieldGoalsPercentage=$scope.percent($scope.average.fieldGoals,$scope.average.fieldGoalsAttempts);
                $scope.average.threePointsPercentage=$scope.percent($scope.average.threePoints,$scope.average.threePointsAttempts);
                $scope.average.freeThrowsPercentage=$scope.percent($scope.average.freeThrows,$scope.average.freeThrowsAttempts);
            }
        );
    };
    
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    };

    $scope.perGameSort=function (player) {
        switch ($scope.propertyName){
            case 'minutes':
                return $scope.round(player.minutes/player.games);
            case 'fg':
                return $scope.round(player.fg/player.games);
            case 'fga':
                return $scope.round(player.fga/player.games);
            case 'tpt':
                return $scope.round(player.tpt/player.games);
            case 'tpta':
                return $scope.round(player.tpta/player.games);
            case 'ft':
                return $scope.round(player.ft/player.games);
            case 'fta':
                return $scope.round(player.fta/player.games);
            case 'plusminus':
                return $scope.round(player.plusminus/player.games);
            case 'oReb':
                return $scope.round(player.oReb/player.games);
            case 'reb':
                return $scope.round(player.reb/player.games);
            case 'assists':
                return $scope.round(player.assists/player.games);
            case 'turnovers':
                return $scope.round(player.turnovers/player.games);
            case 'steals':
                return $scope.round(player.steals/player.games);
            case 'blocks':
                return $scope.round(player.blocks/player.games);
            case 'fouls':
                return $scope.round(player.fouls/player.games);
            case 'points':
                return $scope.round(player.points/player.games);
            default:
                return player[$scope.propertyName];
        }
    };

    $scope.perSort=function (player) {
        switch ($scope.propertyName){
            case 'fg':
                return $scope.round(player.fg/player.minutes*48);
            case 'fga':
                return $scope.round(player.fga/player.minutes*48);
            case 'tpt':
                return $scope.round(player.tpt/player.minutes*48);
            case 'tpta':
                return $scope.round(player.tpta/player.minutes*48);
            case 'ft':
                return $scope.round(player.ft/player.minutes*48);
            case 'fta':
                return $scope.round(player.fta/player.minutes*48);
            case 'plusminus':
                return $scope.round(player.plusminus/player.minutes*48);
            case 'oReb':
                return $scope.round(player.oReb/player.minutes*48);
            case 'reb':
                return $scope.round(player.reb/player.minutes*48);
            case 'assists':
                return $scope.round(player.assists/player.minutes*48);
            case 'turnovers':
                return $scope.round(player.turnovers/player.minutes*48);
            case 'steals':
                return $scope.round(player.steals/player.minutes*48);
            case 'blocks':
                return $scope.round(player.blocks/player.minutes*48);
            case 'fouls':
                return $scope.round(player.fouls/player.minutes*48);
            case 'points':
                return $scope.round(player.points/player.minutes*48);
            default:
                return player[$scope.propertyName];
        }
    };

    $scope.sort=function (player) {
        switch ($scope.propertyName) {
            case 'firstName':
            case 'lastName':
                return $scope.propertyName;
            default:
                return player.stats[$scope.propertyName];
        }
    };
    
    $scope.gameSort=function (game) {
        var team=game.me===0?game.awayTeam:game.homeTeam; 
        var opp=game.me===1?game.awayTeam:game.homeTeam;
        switch ($scope.propertyName){
            case 'result':
                return team.stats.points-opp.stats.points;
            case 'date':
                // var date=game.date.split('/');
                // return date[2]+date[0]+date[1];
                return $scope.propertyName;
            default:
                return team.stats[$scope.propertyName];
        }
    }
}]);