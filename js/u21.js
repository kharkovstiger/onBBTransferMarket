app.controller('u21Ctrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';
    var url='http://www.buzzerbeater.com';
    var data=credentials.get();

    var objectiIds=[
        {
            season:6,
            officials:[2235,
                2240,
                2241,
                2244,
                2248,
                2251
            ],
            scrimmages:[2392,
                2719,
                2860,
                2934,
                2969,
                3017,
                3053
            ]
        },
        {
            season:7,
            officials:[4095,
                4102,
                4230,
                4268,
                4312,
                4350,
                4370,
                4406
            ],
            scrimmages:[3119,
                4605,
                4655,
                4751,
                4779,
                4877
            ]
        },
        {
            season:8,
            officials:[5012,
                5017,
                5019,
                5021,
                5029,
                5032
            ],
            scrimmages:[4938,
                5624,
                5767,
                5778,
                5857,
                5880,
                5914,
                5960
            ]
        },
        {
            season:9,
            officials:[6435,
                6448,
                6509,
                6549,
                6583,
                6644,
                6682,
                6722,
                6927,
                6988
            ],
            scrimmages:[6377,
                7059,
                7107,
                7176
            ]
        },
        {
            season:10,
            officials:[7331,
                7338,
                7340,
                7343,
                7349,
                7353,
                7357
            ],
            scrimmages:[7223,
                8109,
                8133,
                8193,
                8243,
                8311,
                8394
            ]
        },
        {
            season:11,
            officials:[8884,
                8920,
                8971,
                9013,
                9049,
                9091,
                9113,
                9166,
                9379,
                9433
            ],
            scrimmages:[8421,
                9496,
                9539,
                9646
            ]
        },
        {
            season:12,
            officials:[9890,
                9897,
                9899,
                9902,
                9908,
                9912,
                9916
            ],
            scrimmages:[10052,
                10596,
                10641,
                10692,
                10725,
                10803,
                10893
            ]
        },
        {
            season:13,
            officials:[11332,
                11369,
                11434,
                11448,
                11509,
                11552,
                11578,
                11618,
                11859,
                11907
            ],
            scrimmages:[10901,
                11977,
                12021,
                12100
            ]
        },
        {
            season:14,
            officials:[12309,
                12316,
                12318,
                12321,
                12327,
                12331,
                12335
            ],
            scrimmages:[12161,
                13069,
                13110,
                13165,
                13201,
                13278,
                13322
            ]
        },
        {
            season:15,
            officials:[13810,
                13847,
                13885,
                13947,
                13975,
                14038,
                14041,
                14084,
                14337,
                14448
            ],
            scrimmages:[13752,
                14401,
                14493,
                14553,
                14578
            ]
        },
        {
            season:16,
            officials:[14778,
                14782,
                14785,
                14791,
                14793,
                14796,
                14801
            ],
            scrimmages:[15009,
                15557,
                15596,
                15644,
                15696,
                15760,
                15806
            ]
        },
        {
            season:17,
            officials:[16278,
                16315,
                16350,
                16416,
                16463,
                16511,
                16539,
                16590,
                16798,
                16856
            ],
            scrimmages:[16230,
                16921,
                17002
            ]
        },
        {
            season:18,
            officials:[17243,
                17427,
                17250,
                17256,
                17258,
                17261,
                17266,
                17960,
                17964,
                17966,
                17968,
                17972
            ],
            scrimmages:[17046,
                17477,
                18266
            ]
        },
        {
            season:19,
            officials:[18758,
                18776,
                18851,
                18909,
                18947,
                18958,
                19029,
                19072,
                19278,
                19324
            ],
            scrimmages:[18738,
                19387,
                19431,
                19478
            ]
        },
        {
            season:20,
            officials:[19687,
                19691,
                19694,
                19700,
                19702,
                19705,
                19710,
                20391,
                20395,
                20397,
                20399,
                20403
            ],
            scrimmages:[19890,
                20722
            ]
        },
        {
            season:21,
            officials:[21161,
                21198,
                21281,
                21324,
                21356,
                21409,
                21463,
                21506,
                21710,
                21769
            ],
            scrimmages:[21111,
                21862,
                21915,
                21959
            ]
        },
        {
            season:22,
            officials:[22217,
                22223,
                22226,
                22230,
                22233,
                22237,
                22240
            ],
            scrimmages:[22371,
                22950,
                22992,
                23025,
                23083,
                23136,
                23229
            ]
        },
        {
            season:23,
            officials:[23652,
                23685,
                23765,
                23808,
                23860,
                23888,
                23927,
                23970,
                24175,
                24228,
                24281,
                24332,
                24389
            ],
            scrimmages:[23609
            ]
        },
        {
            season:24,
            officials:[24536,
                24540,
                24544,
                24549,
                24552,
                24556,
                24560,
                25280,
                25283,
                25286,
                25289,
                25292
            ],
            scrimmages:[24841,
                25624
            ]
        },
        {
            season:25,
            officials:[26076,
                26112,
                26179,
                26236,
                26283,
                26326,
                26334,
                26377,
                26610,
                26658
            ],
            scrimmages:[26043,
                26724,
                26770,
                26810
            ]
        },
        {
            season:26,
            officials:[27047,
                27053,
                27056,
                27060,
                27063,
                27067,
                27070
            ],
            scrimmages:[27225,
                27775,
                27812,
                27862,
                27899,
                27966,
                28025
            ]
        },
        {
            season:27,
            officials:[28480,
                28522,
                28565,
                28605,
                28667,
                28710,
                28718,
                28761,
                29001,
                29045
            ],
            scrimmages:[28435,
                29088,
                29161,
                29212
            ]
        },
        {
            season:28,
            officials:[29444,
                29448,
                29451,
                29457,
                29459,
                29462,
                29467,
                30086,
                30088,
                30093,
                30095,
                30099
            ],
            scrimmages:[29264,
                30411
            ]
        },
        {
            season:29,
            officials:[30859,
                30896,
                30966,
                30974,
                31035,
                31066,
                31118,
                31161,
                31367,
                31418,
                31463,
                31506,
                31559
            ],
            scrimmages:[30798
            ]
        },
        {
            season:30,
            officials:[31826,
                31832,
                31835,
                31839,
                31842,
                31846,
                31849,
                31860,
                31862,
                31867,
                31869,
                32473
            ],
            scrimmages:[31642,
                32731
            ]
        },
        {
            season:31,
            officials:[33205,
                33232,
                33275,
                33318,
                33370,
                33421,
                33459,
                33502,
                33731,
                33775,
                33818,
                33861
            ],
            scrimmages:[32789,
                33918
            ]
        },
        {
            season:32,
            officials:[34166,
                34172,
                34175,
                34179,
                34182,
                34186,
                34189
            ],
            scrimmages:[34313,
                34868,
                34911,
                34949,
                34999,
                35039,
                35104
            ]
        },
        {
            season:33,
            officials:[35558,
                35596,
                35642,
                35685,
                35745,
                35797,
                35812,
                35844,
                36074,
                36123,
                36173
            ],
            scrimmages:[35489,
                36258,
                36326
            ]
        },
        {
            season:34,
            officials:[36521,
                36525,
                36528,
                36534,
                36536,
                36539,
                36544
            ],
            scrimmages:[36710,
                37252,
                37293,
                37328,
                37390,
                37419,
                37497
            ]
        },
        {
            season:35,
            officials:[37951,
                37964,
                38000,
                38083,
                38102,
                38145,
                38204,
                38238,
                38447,
                38486,
                38530,
                38575,
                38625
            ],
            scrimmages:[37879
            ]
        },
        {
            season:36,
            officials:[38770,
                38774,
                38778,
                38783,
                38786,
                38790,
                38794,
                39506,
                39509,
                39512,
                39515,
                39518,
                39810
            ],
            scrimmages:[39040,
                39871
            ]
        },
        {
            season:37,
            officials:[39964,
                39966,
                39967,
                40634,
                40637,
                40640,
                40643,
                40646
            ],
            scrimmages:[39933,
                40817,
                40870,
                40897,
                40950,
                41021,
                41096
            ]
        },
        {
            season:38,
            officials:[41303,
                41307,
                41311,
                41316,
                41319,
                41323,
                41327
            ],
            scrimmages:[41498,
                42019,
                42069,
                42094,
                42158,
                42196,
                42207,
                42268
            ]
        },
        {
            season:39,
            officials:[42733,
                42770,
                42852,
                42895,
                42902,
                42961,
                42989,
                43032,
                43251
            ],
            scrimmages:[42689,
                43303,
                43353,
                43399,
                43442
            ]
        },
        {
            season:40,
            officials:[43578, 43584, 43587, 43591, 43594, 43598, 43601, 44328, 44331, 44334, 44337],
            scrimmages:[43840]
        }
    ];
    $scope.gameIds=[];
    for(var i=0;i<objectiIds.length;i++){
        for(var j=0;j<objectiIds[i].officials.length;j++) {
            $scope.gameIds.push(objectiIds[i].officials[j]);
        }
        for(var j=0;j<objectiIds[i].scrimmages.length;j++) {
            $scope.gameIds.push(objectiIds[i].scrimmages[j]);
        }
    }
    console.log($scope.gameIds);

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
                if (away.getElementsByTagName('td')[0].textContent.trim() === 'Ukraina U21') {
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
        if(tripl===2) $scope.twenty+=1;
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