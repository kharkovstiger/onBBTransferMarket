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
    $scope.objectIds=[
        {
            season:3,
            officials:[475,477,482,485,487],
            scrimmages:[640,643,738,743,753,771,793]
        },
        {
            season:4,
            officials:[1002,
                1036,
                1092,
                1146,
                1153,
                1203,
                1250,
                1265,
                1350,
                1377
            ],
            scrimmages:[844,
                1412,
                1443
            ]
        },
        {
            season:5,
            officials:[1601,
                1606,
                1608,
                1610,
                1618,
                1621
            ],
            scrimmages:[1488,
                1769,
                1921,
                1965
            ]
        },
        {
            season:6,
            officials:[2068,
                2117,
                2446,
                2483,
                2495,
                2547,
                2586,
                2619
            ],
            scrimmages:[3087
            ]
        },
        {
            season:7,
            officials:[3379,
                3382,
                3385,
                3391,
                3396,
                3399,
                3404
            ],
            scrimmages:[4592,
                4612,
                4667,
                4755,
                4790,
                4835
            ]
        },
        {
            season:8,
            officials:[5281,
                5314,
                5381,
                5420,
                5434,
                5473,
                5506,
                5545,
                5798,
                5825
            ],
            scrimmages:[4933,
                5896,
                5916,
                5987
            ]
        },
        {
            season:9,
            officials:[6280,
                6282,
                6288,
                6289,
                6293,
                6298,
                6302
            ],
            scrimmages:[6396,
                6941,
                7016,
                7062,
                7115,
                7157
            ]
        },
        {
            season:10,
            officials:[7616,
                7651,
                7699,
                7775,
                7801,
                7842,
                7893,
                7934
            ],
            scrimmages:[7219,
                8140,
                8217,
                8277,
                8329
            ]
        },
        {
            season:11,
            officials:[8553,
                8558,
                8563,
                8565,
                8571,
                8575,
                8578
            ],
            scrimmages:[8839,
                9353,
                9410,
                9443,
                9513,
                9576,
                9650
            ]
        },
        {
            season:12,
            officials:[10074,
                10111,
                10166,
                10225,
                10262,
                10333,
                10338,
                10381
            ],
            scrimmages:[10037,
                10652,
                10711,
                10766,
                10796,
                10828
            ]
        },
        {
            season:13,
            officials:[11080,
                11085,
                11090,
                11092,
                11098,
                11102,
                11105
            ],
            scrimmages:[10947,
                11869,
                11923,
                11969,
                12030,
                12090
            ]
        },
        {
            season:14,
            officials:[12553,
                12607,
                12667,
                12710,
                12754,
                12797,
                12835,
                12864,
                13084
            ],
            scrimmages:[12542,
                13161,
                13234,
                13281,
                13368
            ]
        },
        {
            season:15,
            officials:[13604,
                13608,
                13611,
                13617,
                13619,
                13622,
                13627
            ],
            scrimmages:[13736,
                14319,
                14355,
                14412,
                14458,
                14543,
                14593
            ]
        },
        {
            season:16,
            officials:[15039,
                15076,
                15164,
                15207,
                15223,
                15271,
                15338,
                15381,
                15573
            ],
            scrimmages:[14980,
                15658,
                15699,
                15750,
                15812
            ]
        },
        {
            season:17,
            officials:[15994,
                16001,
                16003,
                16006,
                16012,
                16016,
                16020
            ],
            scrimmages:[16223,
                16766,
                16822,
                16872,
                16920,
                16993
            ]
        },
        {
            season:18,
            officials:[17543,
                17567,
                17623,
                17667,
                17706,
                17749,
                17807,
                17850,
                18047,
                18101,
                18150
            ],
            scrimmages:[17068,
                17459,
                18221,
                18298
            ]
        },
        {
            season:19,
            officials:[18481,
                18485,
                18488,
                18494,
                18496,
                18499,
                18504,
                19188,
                19192,
                19194,
                19196,
                19200
            ],
            scrimmages:[18712,
                19481
            ]
        },
        {
            season:20,
            officials:[19975,
                20006,
                20056,
                20099,
                20130,
                20179,
                20205,
                20248,
                20486,
                20530,
                20579,
                20630,
                20690
            ],
            scrimmages:[19895
            ]
        },
        {
            season:21,
            officials:[20952,
                20958,
                20961,
                20965,
                20968,
                20972,
                20975,
                21611,
                21613,
                21618,
                21620,
                21624
            ],
            scrimmages:[21119,
                21975
            ]
        },
        {
            season:22,
            officials:[22444,
                22470,
                22542,
                22596,
                22628,
                22651,
                22712,
                22755,
                22960,
                23007,
                23056
            ],
            scrimmages:[22380,
                23129,
                23181
            ]
        },
        {
            season:23,
            officials:[23464,
                23470,
                23473,
                23477,
                23480,
                23484,
                23487,
                24092,
                24095,
                24096,
                24101,
                24104
            ],
            scrimmages:[23600,
                24414
            ]
        },
        {
            season:24,
            officials:[24462,
                24464,
                24465,
                25212,
                25215,
                25217,
                25219,
                25223,
                25237,
                25240,
                25242,
                25247
            ],
            scrimmages:[25551,
                25632
            ]
        },
        {
            season:25,
            officials:[25893,
                25899,
                25902,
                25906,
                25909,
                25913,
                25916,
                26503,
                26506,
                26507,
                26512,
                26515
            ],
            scrimmages:[26025,
                26852
            ]
        },
        {
            season:26,
            officials:[27276,
                27313,
                27397,
                27400,
                27448,
                27491,
                27561,
                27604,
                27808,
                27852,
                27895
            ],
            scrimmages:[27228,
                27955,
                28045
            ]
        },
        {
            season:27,
            officials:[28208,
                28214,
                28217,
                28221,
                28224,
                28228,
                28231
            ],
            scrimmages:[28450,
                28970,
                29010,
                29058,
                29110,
                29164,
                29215
            ]
        },
        {
            season:28,
            officials:[29655,
                29694,
                29729,
                29799,
                29848,
                29891,
                29933,
                29976,
                30176,
                30218,
                30262
            ],
            scrimmages:[29599,
                30344,
                30371
            ]
        },
        {
            season:29,
            officials:[30533,
                30539,
                30542,
                30546,
                30549,
                30553,
                30556,
                31270,
                31273,
                31276,
                31279,
                31282
            ],
            scrimmages:[30443,
                31564
            ]
        },
        {
            season:30,
            officials:[32042,
                32060,
                32119,
                32162,
                32205,
                32249,
                32287,
                32337,
                32552
            ],
            scrimmages:[31996,
                32599,
                32638,
                32680,
                32742
            ]
        },
        {
            season:31,
            officials:[32937,
                32943,
                32946,
                32950,
                32953,
                32957,
                32960,
                33629,
                33635,
                33633,
                33637,
                33641
            ],
            scrimmages:[32792,
                33943
            ]
        },
        {
            season:32,
            officials:[34358,
                34395,
                34452,
                34495,
                34548,
                34598,
                34620,
                34663,
                34879,
                34930
            ],
            scrimmages:[34351,
                34994,
                35060,
                35114
            ]
        },
        {
            season:33,
            officials:[35312,
                35318,
                35321,
                35328,
                35325,
                35332,
                35335,
                35969,
                35973,
                35977,
                35980,
                35982
            ],
            scrimmages:[35527,
                36286
            ]
        },
        {
            season:34,
            officials:[36755,
                36792,
                36840,
                36894,
                36956,
                36986,
                37032,
                37075,
                37278
            ],
            scrimmages:[36719,
                37345,
                37380,
                37431,
                37485
            ]
        },
        {
            season:35,
            officials:[37636,
                37642,
                37645,
                37649,
                37652,
                37656,
                37659
            ],
            scrimmages:[37884,
                38429,
                38471,
                38489,
                38555,
                38594,
                38652
            ]
        },
        {
            season:36,
            officials:[39102,
                39125,
                39172,
                39242,
                39256,
                39324,
                39370,
                39387,
                39600,
                39653
            ],
            scrimmages:[39054,
                39738,
                39776,
                39826
            ]
        },
        {
            season:37,
            officials:[40119,
                40121,
                40127,
                40128,
                40132,
                40137,
                40141
            ],
            scrimmages:[39914,
                40801,
                40849,
                40880,
                40931,
                41020,
                41063
            ]
        },
        {
            season:38,
            officials:[41539,
                41574,
                41597,
                41640,
                41698,
                41735,
                41772,
                41828,
                42042,
                42090,
                42139
            ],
            scrimmages:[41470,
                42208,
               20285
            ]
        },
        {
            season:39,
            officials:[42570,
                42574,
                42577,
                42583,
                42585,
                42588,
                42593
            ],
            scrimmages:[42339,
                43238,
                43287,
                43324,
                43356,
                43421,
                43440
            ]
        },
        {
            season:40,
            officials:[43901, 43938, 44011, 44051, 44083, 44106, 44146, 44189, 44419, 44459, 44499],
            scrimmages:[43862, 44580, 44626]
        }
    ];
    $scope.gameIds=[];
    for(var i=0;i<$scope.objectIds.length;i++){
        for(var j=0;j<$scope.objectIds[i].officials.length;j++) {
            $scope.gameIds.push($scope.objectIds[i].officials[j]);
        }
        for(var j=0;j<$scope.objectIds[i].scrimmages.length;j++) {
            $scope.gameIds.push($scope.objectIds[i].scrimmages[j]);
        }
    }

    $scope.pentaDouble=0;
    $scope.quadroDouble=0;
    $scope.triplDouble=0;
    $scope.doubleDouble=0;
    $scope.twenty=0;
    $scope.games=[];
    $scope.players=[];

    $scope.getStats=function () {
        $scope.stats($scope.list.split(/[, \n]/));
    };

    $scope.seasonStats=function (season) {
        var games=[];
        for(var j=0;j<$scope.objectIds[season-3].officials.length;j++) {
            games.push($scope.objectIds[season-3].officials[j]);
        }
        if (!$scope.official){
            for(var j=0;j<$scope.objectIds[season-3].scrimmages.length;j++) {
                games.push($scope.objectIds[season-3].officials[j]);
            }
        }
        $scope.stats(games);
    };

    $scope.stats=function(list) {
        $scope.pentaDouble=0;
        $scope.quadroDouble=0;
        $scope.triplDouble=0;
        $scope.doubleDouble=0;
        $scope.twenty=0;
        $scope.games=[];
        $scope.players=[];
        for(var i=0;i<list.length;i++) {
            getGame(list[i]);
        }
    };

    setTimeout($http.get(myBaseURL2 + '/game?id='+44459), 1000*60*15);

    function getGame(id) {
        $http.get(myBaseURL2 + '/game?id='+id).then(
            function (response) {
                var dates = response.data.split(/<title>|<\/title>/g)[1].trim().split(' ');
                for(var i=0;i<dates.length;i++){
                    if (dates[i].includes('/')) {
                        var date = dates[i];
                        break;
                    }
                }
                console.log(date);
                var temp = '<table' + response.data.split(/<table|table>/g)[15] + 'table>';
                var away = $.parseXML(temp.replace(new RegExp('&nbsp;', 'g'), 'x'));
                temp = '<table' + response.data.split(/<table|table>/g)[17] + 'table>';
                var home = $.parseXML(temp.replace(new RegExp('&nbsp;', 'g'), 'x'));
                var type = response.data.split(/<table|table>/g)[18].split('span')[3].split(/>|</g)[1].substring(14);
                if (away.getElementsByTagName('td')[0].textContent.trim() === 'Ukraina') {
                    $scope.games.push(matchConstructor(away, 'away', home.getElementsByTagName('td')[0].textContent.trim(), type,
                        parseInt(home.getElementsByTagName('tr')[home.getElementsByTagName('tr').length-1].
                        getElementsByTagName('td')[home.getElementsByTagName('tr')[home.getElementsByTagName('tr').length-1].
                        getElementsByTagName('td').length>15?13:12].textContent.trim()),
                        date, id));
                    getPlayerStat(away);
                }
                else {
                    $scope.games.push(matchConstructor(home, 'home', away.getElementsByTagName('td')[0].textContent.trim(), type,
                        parseInt(away.getElementsByTagName('tr')[away.getElementsByTagName('tr').length-1].
                        getElementsByTagName('td')[away.getElementsByTagName('tr')[away.getElementsByTagName('tr').length-1].
                        getElementsByTagName('td').length>15?13:12].textContent.trim()),
                        date, id));
                    getPlayerStat(home);
                }

            }
        );
    }

    function getPlayerStat(obj) {
        var trs=obj.getElementsByTagName('tr');
        for(var i=1;i<trs.length-1;i++){
            var flag=true;
            var id=parseInt(trs[i].getElementsByTagName('a')[0].getAttribute('href').split('/')[2]);
            if(trs[i].getElementsByTagName('td').length>3){
                for (var j = 0; j < $scope.players.length; j++) {
                    if ($scope.players[j].id === id) {
                        var tds=trs[i].getElementsByTagName('td');
                        var q=0;
                        if (tds.length>15)
                            q=1;
                        isTwenty(tds,q);
                        $scope.players[j].games+=1;
                        $scope.players[j].minutes+=parseInt(tds[2].textContent.trim());
                        $scope.players[j].points+=parseInt(tds[13+q].textContent.trim());
                        $scope.players[j].fg+=parseInt(tds[3].textContent.trim().split('-')[0].trim());
                        $scope.players[j].fga+=parseInt(tds[3].textContent.trim().split('-')[1].trim());
                        $scope.players[j].fgp=Math.round(($scope.players[j].fg/$scope.players[j].fga)*1000)/10;
                        $scope.players[j].tpt+=parseInt(tds[4].textContent.trim().split('-')[0].trim());
                        $scope.players[j].tpta+=parseInt(tds[4].textContent.trim().split('-')[1].trim());
                        $scope.players[j].tptp=Math.round(($scope.players[j].tpt/$scope.players[j].tpta)*1000)/10;
                        $scope.players[j].ft+=parseInt(tds[5].textContent.trim().split('-')[0].trim());
                        $scope.players[j].fta+=parseInt(tds[5].textContent.trim().split('-')[1].trim());
                        $scope.players[j].ftp=Math.round(($scope.players[j].ft/$scope.players[j].fta)*1000)/10;
                        $scope.players[j].plusminus+=q===1?parseInt(tds[6].textContent.trim()):0;
                        $scope.players[j].reb+=parseInt(tds[7+q].textContent.trim());
                        $scope.players[j].oReb+=parseInt(tds[6+q].textContent.trim());
                        $scope.players[j].assists+=parseInt(tds[8+q].textContent.trim());
                        $scope.players[j].turnovers+=parseInt(tds[9+q].textContent.trim());
                        $scope.players[j].fouls+=parseInt(tds[12+q].textContent.trim());
                        $scope.players[j].steals+=parseInt(tds[10+q].textContent.trim());
                        $scope.players[j].blocks+=parseInt(tds[11+q].textContent.trim());
                        $scope.players[j].dd+=isTripl(tds,q)?1:0;
                        flag=false;
                        break;
                    }
                }
                if(flag) {
                    $scope.players.push(playerConstructor(id, trs[i]));
                    $scope.getNames(id);
                }
            }
        }
    }

    $scope.getNames=function (id) {
        // for(var i=0;i<$scope.players.length;i++){
        //     if($scope.players[i].firstName===''){
        //         break;
        //     }
        // }
        $http.get(myBaseURL1+'/player?id='+id+'&login='+data.login+'&code='+data.code).then(
            function (response) {
                for(var i=0;i<$scope.players.length;i++){
                    if($scope.players[i].id===id){
                        $scope.players[i].firstName=$.parseXML(response.data).getElementsByTagName('firstName')[0].textContent;
                        $scope.players[i].lastName=$.parseXML(response.data).getElementsByTagName('lastName')[0].textContent;
                        break;
                    }
                }
                // $scope.players[i].firstName=$.parseXML(response.data).getElementsByTagName('firstName')[0].textContent;
                // $scope.players[i].lastName=$.parseXML(response.data).getElementsByTagName('lastName')[0].textContent;
            }
        );
    };

    $scope.round=function(n){
        return Math.round(n*10)/10;
    };

    $scope.percent=function(n,m){
        return Math.round(n/m*1000)/10;
    };

    function isTripl(tds,q) {
        var tripl=0;
        if (parseInt(tds[13+q].textContent.trim())>=10) tripl+=1;
        if (parseInt(tds[7+q].textContent.trim())>=10) tripl+=1;
        if (parseInt(tds[8+q].textContent.trim())>=10) tripl+=1;
        if (parseInt(tds[10+q].textContent.trim())>=10) tripl+=1;
        if (parseInt(tds[11+q].textContent.trim())>=10) tripl+=1;
        switch(tripl){
            case 5:
                $scope.pentaDouble+=1;
                break;
            case 4:
                $scope.quadroDouble+=1;
                break;
            case 3:
                $scope.triplDouble+=1;
                break;
            case 2:
                $scope.doubleDouble+=1;
                return true;
                break;
        }
        return false;
    }

    function isTwenty(tds,q) {
        var tripl=0;
        if (parseInt(tds[13+q].textContent.trim())>=20) tripl+=1;
        if (parseInt(tds[7+q].textContent.trim())>=20) tripl+=1;
        if (parseInt(tds[8+q].textContent.trim())>=20) tripl+=1;
        if (parseInt(tds[10+q].textContent.trim())>=20) tripl+=1;
        if (parseInt(tds[11+q].textContent.trim())>=20) tripl+=1;
        if(tripl==2) $scope.twenty+=1;
    }

    function playerConstructor(id, obj) {
        var tds=obj.getElementsByTagName('td');
        var q=0;
        if (tds.length>15)
            q=1;
        isTwenty(tds,q);
        return{
            'id':id,
            'firstName':'',
            'lastName':'',
            'games':1,
            'minutes':parseInt(tds[2].textContent.trim()),
            'points':parseInt(tds[13+q].textContent.trim()),
            'fg':parseInt(tds[3].textContent.trim().split('-')[0].trim()),
            'fga':parseInt(tds[3].textContent.trim().split('-')[1].trim()),
            'fgp':Math.round(parseInt(tds[3].textContent.trim().split('-')[0].trim())/parseInt(tds[3].textContent.trim().split('-')[1].trim())*1000)/10,
            'tpt':parseInt(tds[4].textContent.trim().split('-')[0].trim()),
            'tpta':parseInt(tds[4].textContent.trim().split('-')[1].trim()),
            'tptp':Math.round(parseInt(tds[4].textContent.trim().split('-')[0].trim())/parseInt(tds[4].textContent.trim().split('-')[1].trim())*1000)/10,
            'ft':parseInt(tds[5].textContent.trim().split('-')[0].trim()),
            'fta':parseInt(tds[5].textContent.trim().split('-')[1].trim()),
            'ftp':Math.round(parseInt(tds[5].textContent.trim().split('-')[0].trim())/parseInt(tds[5].textContent.trim().split('-')[1].trim())*1000)/10,
            'plusminus':q===1?parseInt(tds[6].textContent.trim()):0,
            'reb':parseInt(tds[7+q].textContent.trim()),
            'oReb':parseInt(tds[6+q].textContent.trim()),
            'assists':parseInt(tds[8+q].textContent.trim()),
            'turnovers':parseInt(tds[9+q].textContent.trim()),
            'fouls':parseInt(tds[12+q].textContent.trim()),
            'steals':parseInt(tds[10+q].textContent.trim()),
            'blocks':parseInt(tds[11+q].textContent.trim()),
            'dd':isTripl(tds,q)?1:0
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
        var tr=obj.getElementsByTagName('tr')[obj.getElementsByTagName('tr').length-1];
        var tds=tr.getElementsByTagName('td');
        var q=0;
        if (tds.length>15)
            q=1;
        return{
            'id':id,
            'date':date,
            'opponent':opponent,
            'field':field,
            'gameType':gameType,
            'points':parseInt(tds[12+q].textContent.trim()),
            'pointsAgainst':pointsAgainst,
            'fg':parseInt(tds[2].textContent.trim().split('-')[0].trim()),
            'fga':parseInt(tds[2].textContent.trim().split('-')[1].trim()),
            'tpt':parseInt(tds[3].textContent.trim().split('-')[0].trim()),
            'tpta':parseInt(tds[3].textContent.trim().split('-')[1].trim()),
            'ft':parseInt(tds[4].textContent.trim().split('-')[0].trim()),
            'fta':parseInt(tds[4].textContent.trim().split('-')[1].trim()),
            'reb':parseInt(tds[6+q].textContent.trim()),
            'oReb':parseInt(tds[5+q].textContent.trim()),
            'assists':parseInt(tds[7+q].textContent.trim()),
            'turnovers':parseInt(tds[8+q].textContent.trim()),
            'fouls':parseInt(tds[11+q].textContent.trim()),
            'steals':parseInt(tds[9+q].textContent.trim()),
            'blocks':parseInt(tds[10+q].textContent.trim())
        };
    }
    //
    // $scope.comparator=function (a,b) {
    //     console.log(a+'\n'+b);
    //     switch ($scope.propertyName){
    //         case 'result':
    //             return (a.points-a.pointsAgainst<b.points-b.pointsAgainst)?-1:1;
    //             break;
    //         default:
    //             return null;
    //             break;
    //     }
    // };

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
        $scope.propertyName = propertyName;
    };

    $scope.perGameSort=function (player) {
        switch ($scope.propertyName){
            case 'minutes':
                return $scope.round(player.minutes/player.games);
                break;
            case 'fg':
                return $scope.round(player.fg/player.games);
                break;
            case 'fga':
                return $scope.round(player.fga/player.games);
                break;
            case 'tpt':
                return $scope.round(player.tpt/player.games);
                break;
            case 'tpta':
                return $scope.round(player.tpta/player.games);
                break;
            case 'ft':
                return $scope.round(player.ft/player.games);
                break;
            case 'fta':
                return $scope.round(player.fta/player.games);
                break;
            case 'plusminus':
                return $scope.round(player.plusminus/player.games);
                break;
            case 'oReb':
                return $scope.round(player.oReb/player.games);
                break;
            case 'reb':
                return $scope.round(player.reb/player.games);
                break;
            case 'assists':
                return $scope.round(player.assists/player.games);
                break;
            case 'turnovers':
                return $scope.round(player.turnovers/player.games);
                break;
            case 'steals':
                return $scope.round(player.steals/player.games);
                break;
            case 'blocks':
                return $scope.round(player.blocks/player.games);
                break;
            case 'fouls':
                return $scope.round(player.fouls/player.games);
                break;
            case 'points':
                return $scope.round(player.points/player.games);
                break;
            default:
                return player[$scope.propertyName];
                break;
        }
    };

    $scope.perSort=function (player) {
        switch ($scope.propertyName){
            case 'fg':
                return $scope.round(player.fg/player.minutes*48);
                break;
            case 'fga':
                return $scope.round(player.fga/player.minutes*48);
                break;
            case 'tpt':
                return $scope.round(player.tpt/player.minutes*48);
                break;
            case 'tpta':
                return $scope.round(player.tpta/player.minutes*48);
                break;
            case 'ft':
                return $scope.round(player.ft/player.minutes*48);
                break;
            case 'fta':
                return $scope.round(player.fta/player.minutes*48);
                break;
            case 'plusminus':
                return $scope.round(player.plusminus/player.minutes*48);
                break;
            case 'oReb':
                return $scope.round(player.oReb/player.minutes*48);
                break;
            case 'reb':
                return $scope.round(player.reb/player.minutes*48);
                break;
            case 'assists':
                return $scope.round(player.assists/player.minutes*48);
                break;
            case 'turnovers':
                return $scope.round(player.turnovers/player.minutes*48);
                break;
            case 'steals':
                return $scope.round(player.steals/player.minutes*48);
                break;
            case 'blocks':
                return $scope.round(player.blocks/player.minutes*48);
                break;
            case 'fouls':
                return $scope.round(player.fouls/player.minutes*48);
                break;
            case 'points':
                return $scope.round(player.points/player.minutes*48);
                break;
            default:
                return player[$scope.propertyName];
                break;
        }
    };

    $scope.gameSort=function (game) {
        switch ($scope.propertyName){
            case 'result':
                return game.points-game.pointsAgainst;
                break;
            case 'date':
                var date=game.date.split('/');
                return date[2]+date[0]+date[1];
                break;
            default:
                return game[$scope.propertyName];
                break;
        }
    }
}]);