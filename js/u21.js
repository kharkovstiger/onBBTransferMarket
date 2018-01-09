app.controller('u21Ctrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    $scope.pentaDouble=0;
    $scope.quadroDouble=0;
    $scope.triplDouble=0;
    $scope.doubleDouble=0;
    $scope.twenty=0;
    $scope.games=[];
    $scope.players=[];
    $scope.country=data.country.name;

    $http.get(myBaseURL+'/bbapi/season?login='+data.login+'&code='+data.code).then(
        function (response) {
            var doc=$.parseXML(response.data);
            $scope.seasonNow=doc.getElementsByTagName('inProgress')[0].parentElement.getAttribute('id');
        }
    );

    $scope.seasons=function(){
        var arr=[];
        for (var i=3;i<=$scope.seasonNow;i++){
            arr.push(i);
        }
        return arr;
    };

    $scope.stats=function() {
        $scope.pentaDouble=0;
        $scope.quadroDouble=0;
        $scope.triplDouble=0;
        $scope.doubleDouble=0;
        $scope.twenty=0;
        $scope.games=[];
        $scope.players=[];
        $scope.playersPerGame=[];
        $scope.playersPerMinutes=[];
        if ('undefined' !== typeof $scope.list && $scope.list!=='')
            fillStat('/game/gamesForList', $scope.list.split(/[, \n]/));
        else
            fillStat('/game/allGamesForCountry/false', $scope.country+' U21');
    };

    function fillStat(link, data) {
        $http.post(myBaseURL+link, data).then(
            function (response) {
                $scope.games=response.data;
                $scope.games.forEach(function (value) {
                    value.me=value.awayTeam.name===$scope.country+' U21'?0:1;
                });
                console.log($scope.games);
                var request={
                    'games': $scope.games,
                    'country': $scope.country+' U21'
                };
                fillPayers(request);
            }
        );
    }

    function fillPayers(request) {
        getPlayers(request);
        getPlayersPerGame(request);
        getPlayersPerMinutes(request);
    }

    function getPlayers(request) {
        $http.post(myBaseURL+'/player/getPlayersStatForGameList', request).then(
            function (response) {
                $scope.players=response.data;
                $scope.players.forEach(function (value) {
                    value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);
                    value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);
                    value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);
                });
                console.log("ready");
            }
        );
    }

    function getPlayersPerGame(request) {
        $http.post(myBaseURL+'/player/getPlayersStatForGameListPerGame', request).then(
            function (response) {
                $scope.playersPerGame=response.data;
                console.log($scope.playersPerGame);
                $scope.playersPerGame.forEach(function (value) {
                    Object.keys(value.stats).forEach(function (stat) {
                        value.stats[stat]=$scope.round(value.stats[stat]);
                    });
                    value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);
                    value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);
                    value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);
                });
                console.log("ready games");
            }
        );
    }

    function getPlayersPerMinutes(request) {
        $http.post(myBaseURL+'/player/getPlayersStatForGameListPerMinutes', request).then(
            function (response) {
                $scope.playersPerMinutes=response.data;
                console.log($scope.playersPerMinutes);
                $scope.playersPerMinutes.forEach(function (value) {
                    Object.keys(value.stats).forEach(function (stat) {
                        value.stats[stat]=$scope.round(value.stats[stat]);
                    });
                    value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);
                    value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);
                    value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);
                });
                console.log("ready min");
            }
        );
    }

    $scope.seasonStats=function (season) {
        $scope.games=[];
        $scope.players=[];
        $scope.playersPerGame=[];
        $scope.playersPerMinutes=[];
        console.log($scope.official);
        $http.post(myBaseURL+'/game/allGamesForCountryForSeason/'+$scope.official+'/'+season, $scope.country+' U21').then(
            function (response) {
                $scope.games=response.data;
                $scope.games.forEach(function (value) {
                    value.me=value.awayTeam.name===$scope.country+' U21'?0:1;
                });
                console.log($scope.games);
                var request={
                    'games': $scope.games,
                    'country': $scope.country+' U21'
                };
                fillPayers(request);
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
        var request={
            'games': $scope.games,
            'country': $scope.country+' U21'
        };
        $http.post(myBaseURL+'/game/getAveragedStatistics', request).then(
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