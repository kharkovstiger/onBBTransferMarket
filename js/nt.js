app.controller('ntCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    // $http.get(myBaseURL2+'/ntschedule?jun=false&season=40').then(
    //     function (response) {
    //         console.log(response.data);
    //         var temp=response.data.split(/<table class="schedule" style='width:99%'>|table>/g);
    //         console.log($.parseXML('<table>'+temp[15].replace(new RegExp('10px', 'g'), '"10px"')
    //             .replace(new RegExp('colspan=2', 'g'), 'colspan="2"')+'table>'));
    //         var tData=$.parseXML('<table>'+temp[15].replace(new RegExp('10px', 'g'), '"10px"')
    //             .replace(new RegExp('colspan=2', 'g'), 'colspan="2"')+'table>');
    //         var trs=tData.getElementsByTagName('tr');
    //         for (var i=1;i<trs.length;i++){
    //
    //         }
    //     }
    // );

    $scope.gameIds=[42570,42574,42577,42583,42585,42588,42593];
    // $scope.games=[];
    // $scope.players=[];

    $scope.getStats=function () {
        $scope.stats($scope.list.split(/[, \n]/));
    };

    $scope.stats=function(list) {
        $scope.games=[];
        $scope.players=[];
        for(var i=0;i<list.length;i++) {
        // for(var i=0;i<2;i++) {
            $http.get(myBaseURL2 + '/game?id='+list[i]).then(
                function (response) {
                    var date = response.data.split(/<title>|<\/title>/g)[1].trim().split(' ')[6];
                    console.log(date);
                    var temp = '<table' + response.data.split(/<table|table>/g)[15] + 'table>';
                    var away = $.parseXML(temp.replace(new RegExp('&nbsp;', 'g'), 'x'));
                    temp = '<table' + response.data.split(/<table|table>/g)[17] + 'table>';
                    var home = $.parseXML(temp.replace(new RegExp('&nbsp;', 'g'), 'x'));
                    var type = response.data.split(/<table|table>/g)[18].split('span')[3].split(/>|</g)[1];
                    if (away.getElementsByTagName('td')[0].textContent.trim() === 'Ukraina') {
                        $scope.games.push(matchConstructor(away, 'away', home.getElementsByTagName('td')[0].textContent.trim(), type,
                            parseInt(home.getElementsByTagName('td')[home.getElementsByTagName('td').length - 3].textContent.trim()),
                            date, list[i]));
                        getPlayerStat(away);
                    }
                    else {
                        $scope.games.push(matchConstructor(home, 'home', away.getElementsByTagName('td')[0].textContent.trim(), type,
                            parseInt(away.getElementsByTagName('td')[away.getElementsByTagName('td').length - 3].textContent.trim()),
                            date, list[i]));
                        getPlayerStat(home);
                    }

                }
            );
        }
    };

    function getPlayerStat(obj) {
        var trs=obj.getElementsByTagName('tr');
        for(var i=1;i<trs.length-1;i++){
            var flag=true;
            var id=parseInt(trs[i].getElementsByTagName('a')[0].getAttribute('href').split('/')[2]);
            if(trs[i].getElementsByTagName('td').length>3){
                for (var j = 0; j < $scope.players.length; j++) {
                    if ($scope.players[j].id === id) {
                        var tds=trs[i].getElementsByTagName('td');
                        $scope.players[j].games+=1;
                        $scope.players[j].minutes+=parseInt(tds[2].textContent.trim());
                        $scope.players[j].points+=parseInt(tds[14].textContent.trim());
                        $scope.players[j].fg+=parseInt(tds[3].textContent.trim().split('-')[0].trim());
                        $scope.players[j].fga+=parseInt(tds[3].textContent.trim().split('-')[1].trim());
                        $scope.players[j].fgp=Math.round(($scope.players[j].fg/$scope.players[j].fga)*1000)/10;
                        $scope.players[j].tpt+=parseInt(tds[4].textContent.trim().split('-')[0].trim());
                        $scope.players[j].tpta+=parseInt(tds[4].textContent.trim().split('-')[1].trim());
                        $scope.players[j].tptp=Math.round(($scope.players[j].tpt/$scope.players[j].tpta)*1000)/10;
                        $scope.players[j].ft+=parseInt(tds[5].textContent.trim().split('-')[0].trim());
                        $scope.players[j].fta+=parseInt(tds[5].textContent.trim().split('-')[1].trim());
                        $scope.players[j].ftp=Math.round(($scope.players[j].ft/$scope.players[j].fta)*1000)/10;
                        $scope.players[j].plusminus+=parseInt(tds[6].textContent.trim());
                        $scope.players[j].reb+=parseInt(tds[8].textContent.trim());
                        $scope.players[j].oReb+=parseInt(tds[7].textContent.trim());
                        $scope.players[j].assists+=parseInt(tds[9].textContent.trim());
                        $scope.players[j].turnovers+=parseInt(tds[10].textContent.trim());
                        $scope.players[j].fouls+=parseInt(tds[13].textContent.trim());
                        $scope.players[j].steals+=parseInt(tds[11].textContent.trim());
                        $scope.players[j].blocks+=parseInt(tds[12].textContent.trim());
                        flag=false;
                        break;
                    }
                }
                if(flag) {
                    $scope.players.push(playerConstructor(id, trs[i]));
                }
            }
        }
    }

    $scope.getNames=function () {
        for(var i=0;i<$scope.players.length;i++){
            if($scope.players[i].firstName===''){
                break;
            }
        }
        $http.get(myBaseURL1+'/player?id='+$scope.players[i].id+'&login='+data.login+'&code='+data.code).then(
            function (response) {
                $scope.players[i].firstName=$.parseXML(response.data).getElementsByTagName('firstName')[0].textContent;
                $scope.players[i].lastName=$.parseXML(response.data).getElementsByTagName('lastName')[0].textContent;
            }
        );
    };

    $scope.round=function(n){
        return Math.round(n*10)/10;
    };

    $scope.percent=function(n,m){
        return Math.round(n/m*1000)/10;
    };

    function playerConstructor(id, obj) {
        var tds=obj.getElementsByTagName('td');
        return{
            'id':id,
            'firstName':'',
            'lastName':'',
            'games':1,
            'minutes':parseInt(tds[2].textContent.trim()),
            'points':parseInt(tds[14].textContent.trim()),
            'fg':parseInt(tds[3].textContent.trim().split('-')[0].trim()),
            'fga':parseInt(tds[3].textContent.trim().split('-')[1].trim()),
            'fgp':Math.round(parseInt(tds[3].textContent.trim().split('-')[0].trim())/parseInt(tds[3].textContent.trim().split('-')[1].trim())*1000)/10,
            'tpt':parseInt(tds[4].textContent.trim().split('-')[0].trim()),
            'tpta':parseInt(tds[4].textContent.trim().split('-')[1].trim()),
            'tptp':Math.round(parseInt(tds[4].textContent.trim().split('-')[0].trim())/parseInt(tds[4].textContent.trim().split('-')[1].trim())*1000)/10,
            'ft':parseInt(tds[5].textContent.trim().split('-')[0].trim()),
            'fta':parseInt(tds[5].textContent.trim().split('-')[1].trim()),
            'ftp':Math.round(parseInt(tds[5].textContent.trim().split('-')[0].trim())/parseInt(tds[5].textContent.trim().split('-')[1].trim())*1000)/10,
            'plusminus':parseInt(tds[6].textContent.trim()),
            'reb':parseInt(tds[8].textContent.trim()),
            'oReb':parseInt(tds[7].textContent.trim()),
            'assists':parseInt(tds[9].textContent.trim()),
            'turnovers':parseInt(tds[10].textContent.trim()),
            'fouls':parseInt(tds[13].textContent.trim()),
            'steals':parseInt(tds[11].textContent.trim()),
            'blocks':parseInt(tds[12].textContent.trim())
        };
    }

    $scope.getAverages=function () {
        $scope.average={
            'points':0,
            'pointsAgainst':0,
            'fg':0,
            'fga':0,
            'tpt':0,
            'tpta':0,
            'ft':0,
            'fta':0,
            'reb':0,
            'oReb':0,
            'assists':0,
            'turnovers':0,
            'fouls':0,
            'steals':0,
            'blocks':0
        };
        for (var i=0;i<$scope.games.length;i++){
            $scope.average.points+=$scope.games[i].points;
            $scope.average.pointsAgainst+=$scope.games[i].pointsAgainst;
            $scope.average.fg+=$scope.games[i].fg;
            $scope.average.fga+=$scope.games[i].fga;
            $scope.average.tpt+=$scope.games[i].tpt;
            $scope.average.tpta+=$scope.games[i].tpta;
            $scope.average.ft+=$scope.games[i].ft;
            $scope.average.fta+=$scope.games[i].fta;
            $scope.average.oReb+=$scope.games[i].oReb;
            $scope.average.reb+=$scope.games[i].reb;
            $scope.average.assists+=$scope.games[i].assists;
            $scope.average.steals+=$scope.games[i].steals;
            $scope.average.turnovers+=$scope.games[i].turnovers;
            $scope.average.blocks+=$scope.games[i].blocks;
            $scope.average.fouls+=$scope.games[i].fouls;
        }
    };

    function matchConstructor(obj, field, opponent, gameType, pointsAgainst, date, id) {
        var tds=obj.getElementsByTagName('td');
        return{
            'id':id,
            'date':date,
            'opponent':opponent,
            'field':field,
            'gameType':gameType,
            'points':parseInt(tds[tds.length-3].textContent.trim()),
            'pointsAgainst':pointsAgainst,
            'fg':parseInt(tds[tds.length-14].textContent.trim().split('-')[0].trim()),
            'fga':parseInt(tds[tds.length-14].textContent.trim().split('-')[1].trim()),
            'tpt':parseInt(tds[tds.length-13].textContent.trim().split('-')[0].trim()),
            'tpta':parseInt(tds[tds.length-13].textContent.trim().split('-')[1].trim()),
            'ft':parseInt(tds[tds.length-12].textContent.trim().split('-')[0].trim()),
            'fta':parseInt(tds[tds.length-12].textContent.trim().split('-')[1].trim()),
            'reb':parseInt(tds[tds.length-9].textContent.trim()),
            'oReb':parseInt(tds[tds.length-10].textContent.trim()),
            'assists':parseInt(tds[tds.length-8].textContent.trim()),
            'turnovers':parseInt(tds[tds.length-7].textContent.trim()),
            'fouls':parseInt(tds[tds.length-4].textContent.trim()),
            'steals':parseInt(tds[tds.length-6].textContent.trim()),
            'blocks':parseInt(tds[tds.length-5].textContent.trim())
        };
    }

}]);