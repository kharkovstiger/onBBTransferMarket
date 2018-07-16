app.controller('u21Ctrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    $scope.pentaDouble=0;
    $scope.quadroDouble=0;
    $scope.triplDouble=0;
    $scope.doubleDouble=0;
    $scope.twenty=0;
    $scope.fifth=0;
    $scope.games=[];
    $scope.players=[];
    $scope.country=data.country.name;
    $scope.records={};
    $scope.allCountries=[];

    $http.get(myBaseURL+'/bbapi/country?login='+data.login+'&code='+data.code).then(
        function (response) {
            var xml=$.parseXML(response.data).getElementsByTagName('country');
            for(var i=0;i<xml.length;i++){
                $scope.allCountries.push(xml[i].textContent);
            }
        }
    );

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

    $scope.stats=function(string) {
        $scope.pentaDouble=0;
        $scope.quadroDouble=0;
        $scope.triplDouble=0;
        $scope.doubleDouble=0;
        $scope.twenty=0;
        $scope.fifth=0;
        $scope.games=[];
        $scope.players=[];
        $scope.playersPerGame=[];
        $scope.playersPerMinutes=[];
        $scope.records={};
        if (string=='opponent')
            $http.post(myBaseURL+'/game/allGamesForCountryAgainstCountry/'+$scope.official, [$scope.country+' U21', $scope.opponent+' U21']).then(
                function (response) {
                    fillStat(response);
                }
            );
        else {
            if ('undefined' !== typeof $scope.list && $scope.list!=='')
                $http.post(myBaseURL+'/game/gamesForList', $scope.list.split(/[, \n]/)).then(
                    function (response) {
                        fillStat(response);
                    }
                );
            else
                $http.post(myBaseURL+'/game/allGamesForCountry/false', $scope.country+' U21').then(
                    function (response) {
                        fillStat(response);
                    }
                );
        }
    };

    function fillStat(response) {
        $scope.games = response.data;
        $scope.games.forEach(function (value) {
            value.me = value.awayTeam.name === $scope.country+' U21' ? 0 : 1;
        });
        console.log($scope.games);
        var request = {
            'games': $scope.games,
            'country': $scope.country+' U21'
        };
        fillPayers(request);
        getTacticsStats(request);
    }

    function getTacticsStats(request) {
        $http.post(myBaseURL+'/game/offTactics', request).then(
            function (response) {
                $scope.offensiveStats=response.data;
                Object.keys($scope.offensiveStats).forEach(function (key) {
                    Object.keys($scope.offensiveStats[key]).forEach(function (value) {
                        $scope.offensiveStats[key][value] = $scope.round($scope.offensiveStats[key][value]);
                    });
                });
                for (var key in $scope.offensiveStats) {
                    $scope.offensiveStats[key].fieldGoalsPercentage=$scope.percent($scope.offensiveStats[key].fieldGoals,$scope.offensiveStats[key].fieldGoalsAttempts);
                    $scope.offensiveStats[key].threePointsPercentage=$scope.percent($scope.offensiveStats[key].threePoints,$scope.offensiveStats[key].threePointsAttempts);
                    $scope.offensiveStats[key].freeThrowsPercentage=$scope.percent($scope.offensiveStats[key].freeThrows,$scope.offensiveStats[key].freeThrowsAttempts);
                }
                console.log($scope.offensiveStats);
            }
        );
        $http.post(myBaseURL+'/game/defTactics', request).then(
            function (response) {
                $scope.defensiveStats=response.data;
                Object.keys($scope.defensiveStats).forEach(function (key) {
                    Object.keys($scope.defensiveStats[key]).forEach(function (value) {
                        $scope.defensiveStats[key][value] = $scope.round($scope.defensiveStats[key][value]);
                    });
                });
                for (var key in $scope.defensiveStats) {
                    $scope.defensiveStats[key].fieldGoalsPercentage=$scope.percent($scope.defensiveStats[key].fieldGoals,$scope.defensiveStats[key].fieldGoalsAttempts);
                    $scope.defensiveStats[key].threePointsPercentage=$scope.percent($scope.defensiveStats[key].threePoints,$scope.defensiveStats[key].threePointsAttempts);
                    $scope.defensiveStats[key].freeThrowsPercentage=$scope.percent($scope.defensiveStats[key].freeThrows,$scope.defensiveStats[key].freeThrowsAttempts);
                }
                console.log($scope.defensiveStats);
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
                console.log(response.data);
                $scope.players=response.data.players;
                $scope.players.forEach(function (value) {
                    addPercentages(value);
                });

                $scope.doubleDouble=response.data.doubles.doubleDouble;
                $scope.triplDouble=response.data.doubles.tripleDouble;
                $scope.quadroDouble=response.data.doubles.quadroDouble;
                $scope.pentaDouble=response.data.doubles.pentaDouble;
                $scope.twenty=response.data.doubles.twenty;
                $scope.records=response.data.records;
                $scope.fifth=response.data.doubles.fifth;
                console.log($scope.records);
                console.log("ready");
            }
        );
    }

    function addPercentages(value) {
        value.stats.fieldGoalsPercentage=$scope.percent(value.stats.fieldGoals,value.stats.fieldGoalsAttempts);
        value.stats.threePointsPercentage=$scope.percent(value.stats.threePoints,value.stats.threePointsAttempts);
        value.stats.freeThrowsPercentage=$scope.percent(value.stats.freeThrows,value.stats.freeThrowsAttempts);
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
                    addPercentages(value);
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
                    addPercentages(value);
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
                getTacticsStats(request);
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
                return player[$scope.propertyName];
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
                return game[$scope.propertyName];
            default:
                return team.stats[$scope.propertyName];
        }
    };

    $scope.openModal=function (doubles) {
        $scope.doubles=doubles;
        $scope.modal=!$scope.modal;
        console.log($scope.doubles);
        console.log($scope.modal);
    };


    $scope.openPlayerModal=function(playerId){
        var request={
            'games': $scope.games,
            'country': $scope.country+' U21'
        };
        $scope.playerModal=false;
        $http.post(myBaseURL+'/player/offTactics/'+playerId, request).then(
            function (response) {
                $scope.playerOffensiveStats=response.data;
                Object.keys($scope.playerOffensiveStats).forEach(function (key) {
                    Object.keys($scope.playerOffensiveStats[key]).forEach(function (value) {
                        $scope.playerOffensiveStats[key][value] = $scope.round($scope.playerOffensiveStats[key][value]);
                    });
                });
                for (var key in $scope.playerOffensiveStats) {
                    $scope.playerOffensiveStats[key].fieldGoalsPercentage=$scope.percent($scope.playerOffensiveStats[key].fieldGoals,$scope.playerOffensiveStats[key].fieldGoalsAttempts);
                    $scope.playerOffensiveStats[key].threePointsPercentage=$scope.percent($scope.playerOffensiveStats[key].threePoints,$scope.playerOffensiveStats[key].threePointsAttempts);
                    $scope.playerOffensiveStats[key].freeThrowsPercentage=$scope.percent($scope.playerOffensiveStats[key].freeThrows,$scope.playerOffensiveStats[key].freeThrowsAttempts);
                }
                $scope.playerModal=true;
            }
        );
    };
}]);