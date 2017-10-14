app.controller('ukrCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';

    var data=credentials.get();
    $scope.cups=[];

    $http.get(myBaseURL2+'/country').then(
        function (response) {
            // console.log(response);
            var temp=response.data.split(/<table border="0" cellpadding="1" cellspacing="1" width="100%">|<\/table>/g);
            var leagueChamps;
            var cupChamps;
            for(var i=1;i<temp.length-1;i++){
                temp[i]='<table>'+temp[i]+'</table>';
                if(temp[i].includes('ctl00_cphContent_rptLeagueChamps')) {
                    leagueChamps=$.parseXML(temp[i]).getElementsByTagName('tr');
                }
                if(temp[i].includes('ctl00_cphContent_rptCupChamps')) {
                    cupChamps=$.parseXML(temp[i]).getElementsByTagName('tr');
                }
            };
            for(var i=1;i<leagueChamps.length;i++){
                teamConstructor(leagueChamps[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0],1);
                teamConstructor(leagueChamps[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0],2);
            }
            for(var i=1;i<cupChamps.length;i++){
                teamConstructor(cupChamps[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0],3);
                teamConstructor(cupChamps[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0],4);
            }
            $scope.sort('titles');
            //*************************Working with DOM
            // var doc=$('<output>').append($.parseHTML(response.data));
            // var appContainer = $('#ctl00_cphContent_rptCupChamps_ctl01_rankingTR', doc);
            // console.log(appContainer);
        }
    );

    function teamConstructor(obj,n) {
        for(var i=0; i<$scope.cups.length; i++){
            if($scope.cups[i].name===obj.textContent){
                switch (n){
                    case 1:
                        $scope.cups[i].league+=1;
                        $scope.cups[i].leagueFinal+=1;
                        break;
                    case 2:
                        $scope.cups[i].leagueFinal+=1;
                        break;
                    case 3:
                        $scope.cups[i].cup+=1;
                        $scope.cups[i].cupFinal+=1;
                        break;
                    case 4:
                        $scope.cups[i].cupFinal+=1;
                        break;
                }
                return;
            }
        }
        $scope.cups.push({
            'href': url+obj.getAttribute('href').split('..\/..'),
            'name': obj.textContent,
            'league': n===1?1:0,
            'leagueFinal': (n===2 || n===1)?1:0,
            'cup': n===3?1:0,
            'cupFinal': (n===4 || n===3)?1:0
        });
    }

    var sort=null;

    $scope.sort=function (by) {
        switch (by){
            case 'name':
                if (sort===1) {
                    $scope.cups.sort(function (a, b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0);} );
                    sort=1;
                }
                break;
            case 'SL':
                if (sort===2) {
                    $scope.cups.sort(function(a, b) {return (a.league > b.league) ? 1 : ((b.league > a.league) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.league < b.league) ? 1 : ((b.league < a.league) ? -1 : 0);} );
                    sort=2;
                }
                break;
            case 'SLF':
                if (sort===3) {
                    $scope.cups.sort(function(a, b) {return (a.leagueFinal > b.leagueFinal) ? 1 : ((b.leagueFinal > a.leagueFinal) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.leagueFinal < b.leagueFinal) ? 1 : ((b.leagueFinal < a.leagueFinal) ? -1 : 0);} );
                    sort=3;
                }
                break;
            case 'cup':
                if (sort===4) {
                    $scope.cups.sort(function(a, b) {return (a.cup > b.cup) ? 1 : ((b.cup > a.cup) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.cup < b.cup) ? 1 : ((b.cup < a.cup) ? -1 : 0);} );
                    sort=4;
                }
                break;
            case 'cupF':
                if (sort===5) {
                    $scope.cups.sort(function(a, b) {return (a.cupFinal > b.cupFinal) ? 1 : ((b.cupFinal > a.cupFinal) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.cupFinal < b.cupFinal) ? 1 : ((b.cupFinal < a.cupFinal) ? -1 : 0);} );
                    sort=5;
                }
                break;
            case 'titles':
                if (sort===6) {
                    $scope.cups.sort(function(a, b) {return (a.cup+a.league > b.cup+b.league) ? 1 : ((b.cup+b.league > a.cup+a.league) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.cup+a.league < b.cup+b.league) ? 1 : ((b.cup+b.league < a.cup+a.league) ? -1 : 0);} );
                    sort=6;
                }
                break;
            case 'finals':
                if (sort===7) {
                    $scope.cups.sort(function(a, b) {return (a.cupFinal+a.leagueFinal > b.cupFinal+b.leagueFinal) ? 1 : ((b.cupFinal+b.leagueFinal > a.cupFinal+a.leagueFinal) ? -1 : 0);} );
                    sort=0;
                }
                else{
                    $scope.cups.sort(function(a, b) {return (a.cupFinal+a.leagueFinal < b.cupFinal+b.leagueFinal) ? 1 : ((b.cupFinal+b.leagueFinal < a.cupFinal+a.leagueFinal) ? -1 : 0);} );
                    sort=7;
                }
                break;
            default:
                break;
        }
    }

}]);