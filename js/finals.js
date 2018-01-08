app.controller('finalsCtrl', ['$scope', '$http', 'credentials', '$rootScope', function($scope, $http, credentials, $rootScope) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';

    var data=credentials.get();
    $scope.cups=[];
    $scope.leagues=[];
    console.log($rootScope.countries);
    $scope.country=data.country.code;

    $http.get(myBaseURL1+'/season?login='+data.login+'&code='+data.code).then(
        function (response) {
            for(var i=3;i<$.parseXML(response.data).getElementsByTagName('inProgress')[0].parentElement.getAttribute('id');i++){
                $http.get(myBaseURL2+'/cup?season='+i+'&country='+$scope.country).then(
                    function (response) {
                        var season=response.data.split(/selected="selected" value="/g)[1].substring(0,3).split('"')[0];
                        var temp='<tr>'+
                            response.data.split(/Championship|Semifinals/g)[1].split(/<table>|<\/table>/g)[1].split(/<tr>|<\/tr>/g)[2]+
                            '</tr>';
                        var tds=$.parseXML(temp).getElementsByTagName('td');
                        var a=$.parseXML(temp).getElementsByTagName('a');
                        $http.get(myBaseURL1+'/boxscore?login='+data.login+'&code='+data.code+'&id='+a[1].getAttribute('href').split('/')[2]).then(
                            function (response) {
                                var nOT=$.parseXML(response.data).getElementsByTagName('score')[0].getAttribute('partials').split(',').length-4;
                                if(parseInt(a[1].textContent.split('-')[0].trim())>parseInt(a[1].textContent.split('-')[1].trim())){
                                    $scope.cups.push(cupConstructor(tds,a,0,season,nOT));
                                }
                                else{
                                    $scope.cups.push(cupConstructor(tds,a,1,season,nOT));
                                }
                            }
                        );
                    }
                );
                $http.get(myBaseURL1+'/standings?leagueid=1366&season='+i+'&login='+data.login+'&code='+data.code).then(
                    function (response) {
                        var temp=$.parseXML(response.data);
                        var season=temp.getElementsByTagName('standings')[0].getAttribute('season');
                        var winner=temp.getElementsByTagName('winner')[0].textContent;
                        var games=temp.getElementsByTagName('finals')[0].getElementsByTagName('match');
                        var ha=games[0].getElementsByTagName('teamName')[1].textContent===winner?1:0;
                        var nOT=[];
                        $http.get(myBaseURL1+'/boxscore?login='+data.login+'&code='+data.code+'&id='+games[0].getAttribute('id')).then(
                            function (response) {
                                nOT[0]=$.parseXML(response.data).getElementsByTagName('score')[0].getAttribute('partials').split(',').length-4;
                                $http.get(myBaseURL1+'/boxscore?login='+data.login+'&code='+data.code+'&id='+games[1].getAttribute('id')).then(
                                    function (response) {
                                        nOT[1]=$.parseXML(response.data).getElementsByTagName('score')[0].getAttribute('partials').split(',').length-4;
                                        if(games.length===3) {
                                            $http.get(myBaseURL1 + '/boxscore?login=' + data.login + '&code=' + data.code + '&id=' + games[2].getAttribute('id')).then(
                                                function (response) {
                                                    nOT[2] = $.parseXML(response.data).getElementsByTagName('score')[0].getAttribute('partials').split(',').length - 4;
                                                    $scope.leagues.push(leagueConstructor(season, games, winner, ha, nOT));
                                                }
                                            );
                                        }
                                        else{
                                            nOT[2]=0;
                                            $scope.leagues.push(leagueConstructor(season, games, winner, ha, nOT));
                                        }
                                    }
                                );
                            }
                        );
                    }
                );
            }
        }
    );

    function cupConstructor(td,a,n,season,nOT) {
        return{
            'winner': {
                'name':n===0?a[0].textContent:a[2].textContent,
                'href':n===0?url+a[0].getAttribute('href'):url+a[2].getAttribute('href'),
                'league':n===0?td[1].textContent:td[5].textContent,
                'result':n===0?parseInt(a[1].textContent.split('-')[0].trim()):parseInt(a[1].textContent.split('-')[1].trim())
            },
            'runnerUp': {
                'name':n===1?a[0].textContent:a[2].textContent,
                'href':n===1?url+a[0].getAttribute('href'):url+a[2].getAttribute('href'),
                'league':n===1?td[1].textContent:td[5].textContent,
                'result':n===1?parseInt(a[1].textContent.split('-')[0].trim()):parseInt(a[1].textContent.split('-')[1].trim())
            },
            'game':{
                'season':parseInt(season),
                'href':url+a[1].getAttribute('href'),
                'OT':nOT>=0?nOT:0
            }
        };
    }

    function leagueConstructor(season, games, winner, ha, nOT) {
        return{
            'winner': {
                'name':winner,
                'id':ha===1?games[0].getElementsByTagName('homeTeam')[0].getAttribute('id'):games[0].getElementsByTagName('awayTeam')[0].getAttribute('id'),
                'game1':ha===1?parseInt(games[0].getElementsByTagName('score')[1].textContent)
                    :parseInt(games[0].getElementsByTagName('score')[0].textContent),
                'game2':ha===1?parseInt(games[1].getElementsByTagName('score')[0].textContent)
                    :parseInt(games[1].getElementsByTagName('score')[1].textContent),
                'game3':games.length===2?'':ha===1?parseInt(games[2].getElementsByTagName('score')[1].textContent)
                    :parseInt(games[2].getElementsByTagName('score')[0].textContent)
            },
            'runnerUp': {
                'name':ha===0?games[0].getElementsByTagName('teamName')[1].textContent:games[0].getElementsByTagName('teamName')[0].textContent,
                'id':ha===0?games[0].getElementsByTagName('homeTeam')[0].getAttribute('id'):games[0].getElementsByTagName('awayTeam')[0].getAttribute('id'),
                'game1':ha===0?parseInt(games[0].getElementsByTagName('score')[1].textContent)
                    :parseInt(games[0].getElementsByTagName('score')[0].textContent),
                'game2':ha===0?parseInt(games[1].getElementsByTagName('score')[0].textContent)
                    :parseInt(games[1].getElementsByTagName('score')[1].textContent),
                'game3':games.length===2?'':ha===0?parseInt(games[2].getElementsByTagName('score')[1].textContent)
                    :parseInt(games[2].getElementsByTagName('score')[0].textContent)
            },
            'game':{
                'season':parseInt(season),
                'id':[games[0].getAttribute('id'), games[1].getAttribute('id'), games.length===3?games[2].getAttribute('id'):''],
                'OT':nOT,
                'ha':ha
            }
        };
    }

    var sort=null;

    $scope.sort=function (by, arr) {
        switch (by){
            case 'season':
                if (sort===1) {
                    arr.sort(function (a, b) {return (a.game.season > b.game.season) ? 1 : ((b.game.season > a.game.season) ? -1 : 0);});
                    sort=0;
                }
                else{
                    arr.sort(function(a, b) {return (a.game.season < b.game.season) ? 1 : ((b.game.season < a.game.season) ? -1 : 0);} );
                    sort=1;
                }
                break;
            case 'winner':
                if (sort===2) {
                    arr.sort(function(a, b) {return (a.winner.name > b.winner.name) ? 1 : ((b.winner.name > a.winner.name) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    arr.sort(function(a, b) {return (a.winner.name < b.winner.name) ? 1 : ((b.winner.name < a.winner.name) ? -1 : 0);} );
                    sort=2;
                }
                break;
            case 'runner':
                if (sort===3) {
                    arr.sort(function(a, b) {return (a.runnerUp.name > b.runnerUp.name) ? 1 : ((b.runnerUp.name > a.runnerUp.name) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    arr.sort(function(a, b) {return (a.runnerUp.name < b.runnerUp.name) ? 1 : ((b.runnerUp.name < a.runnerUp.name) ? -1 : 0);} );
                    sort=3;
                }
                break;
            case 'result':
                if (sort===4) {
                    $scope.cups.sort(function(a, b) {return (a.winner.result-a.runnerUp.result > b.winner.result-b.runnerUp.result)
                        ? 1 : ((b.winner.result-b.runnerUp.result > a.winner.result-a.runnerUp.result) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.winner.result-a.runnerUp.result < b.winner.result-b.runnerUp.result)
                        ? 1 : ((b.winner.result-b.runnerUp.result < a.winner.result-a.runnerUp.result) ? -1 : 0);} );
                    sort=4;
                }
                break;
            case 'game1':
                if (sort===5) {
                    $scope.leagues.sort(function(a, b) {return (a.winner.game1-a.runnerUp.game1 > b.winner.game1-b.runnerUp.game1)
                        ? 1 : ((b.winner.game1-b.runnerUp.game1 > a.winner.game1-a.runnerUp.game1) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.leagues.sort(function(a, b) {return (a.winner.game1-a.runnerUp.game1 < b.winner.game1-b.runnerUp.game1)
                        ? 1 : ((b.winner.game1-b.runnerUp.game1 < a.winner.game1-a.runnerUp.game1) ? -1 : 0);} );
                    sort=5;
                }
                break;
            case 'game2':
                if (sort===6) {
                    $scope.leagues.sort(function(a, b) {return (a.winner.game2-a.runnerUp.game2 > b.winner.game2-b.runnerUp.game2)
                        ? 1 : ((b.winner.game2-b.runnerUp.game2 > a.winner.game2-a.runnerUp.game2) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.leagues.sort(function(a, b) {return (a.winner.game2-a.runnerUp.game2 < b.winner.game2-b.runnerUp.game2)
                        ? 1 : ((b.winner.game2-b.runnerUp.game2 < a.winner.game2-a.runnerUp.game2) ? -1 : 0);} );
                    sort=6;
                }
                break;
            case 'game3':
                if (sort===7) {
                    $scope.leagues.sort(function(a, b) {return (a.winner.game3-a.runnerUp.game3 > b.winner.game3-b.runnerUp.game3)
                        ? 1 : ((b.winner.game3-b.runnerUp.game3 > a.winner.game3-a.runnerUp.game3) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.leagues.sort(function(a, b) {return (a.winner.game3-a.runnerUp.game3 < b.winner.game3-b.runnerUp.game3)
                        ? 1 : ((b.winner.game3-b.runnerUp.game3 < a.winner.game3-a.runnerUp.game3) ? -1 : 0);} );
                    sort=7;
                }
                break;
            default:
                break;
        }
    }

}]);