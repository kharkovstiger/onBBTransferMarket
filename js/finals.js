app.controller('finalsCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';

    var data=credentials.get();
    $scope.teams=[];

    $http.get(myBaseURL1+'/season?login='+data.login+'&code='+data.code).then(
        function (response) {
            for(var i=3;i<$.parseXML(response.data).getElementsByTagName('inProgress')[0].parentElement.getAttribute('id');i++){
                $http.get(myBaseURL2+'/cup?season='+i).then(
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
                                    $scope.teams.push(teamConstructor(tds,a,0,season,nOT));
                                }
                                else{
                                    $scope.teams.push(teamConstructor(tds,a,1,season,nOT));
                                }
                            }
                        );
                    }
                );
            }
        }
    );

    function teamConstructor(td,a,n,season,nOT) {
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

    var sort=null;

    $scope.sort=function (by) {
        switch (by){
            case 'season':
                if (sort===1) {
                    $scope.teams.sort(function (a, b) {return (a.game.season > b.game.season) ? 1 : ((b.game.season > a.game.season) ? -1 : 0);});
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.game.season < b.game.season) ? 1 : ((b.game.season < a.game.season) ? -1 : 0);} );
                    sort=1;
                }
                break;
            case 'winner':
                if (sort===2) {
                    $scope.teams.sort(function(a,b) {return (a.winner.name > b.winner.name) ? 1 : ((b.winner.name > a.winner.name) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.winner.name < b.winner.name) ? 1 : ((b.winner.name < a.winner.name) ? -1 : 0);} );
                    sort=2;
                }
                break;
            case 'runner':
                if (sort===3) {
                    $scope.teams.sort(function(a,b) {return (a.runnerUp.name > b.runnerUp.name) ? 1 : ((b.runnerUp.name > a.runnerUp.name) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.runnerUp.name < b.runnerUp.name) ? 1 : ((b.runnerUp.name < a.runnerUp.name) ? -1 : 0);} );
                    sort=3;
                }
                break;
            case 'result':
                if (sort===4) {
                    $scope.teams.sort(function(a,b) {return (a.winner.result-a.runnerUp.result > b.winner.result-b.runnerUp.result)
                        ? 1 : ((b.winner.result-b.runnerUp.result > a.winner.result-a.runnerUp.result) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.teams.sort(function(a,b) {return (a.winner.result-a.runnerUp.result < b.winner.result-b.runnerUp.result)
                        ? 1 : ((b.winner.result-b.runnerUp.result < a.winner.result-a.runnerUp.result) ? -1 : 0);} );
                    sort=4;
                }
                break;
            default:
                break;
        }
    }

}]);