app.controller('mainCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    // var A=[4,2];
    // function obj(a) {
    //     this.a=a
    // }
    // obj.prototype={
    //     value: function () {
    //         return this.a;
    //     }
    // };
    //
    // var T=[];
    // SELECT c.country AS country,
    //     (SELECT SUM(CASE WHEN t1.value>0 THEN t1.value ELSE 0 END)) AS export,
    // (SELECT SUM(CASE WHEN t2.value>0 THEN t2.value ELSE 0 END)) AS import
    //     FROM companies c
    // LEFT JOIN trades t1 ON t1.seller=c.name
    // LEFT JOIN trades t2 ON t2.buyer=c.name
    // GROUP BY c.country
    // ORDER BY c.country
    // T.push(new obj(A[0]));
    // T.push(new obj(A[1]));
    // console.log(T[0].value);
    // console.log(T[1].value);
    // console.log(T[0].value());
    // console.log(T[0].value()===A[0]);
    // console.log(T[1].value()===A[1]);
    // console.log(T[0].value===T[1].value);
    // console.log(!T[0].hasOwnProperty('value'));
    // console.log(!T[1].hasOwnProperty('value'));

    var data=credentials.get();
    $scope.isDisable=false;
    $scope.register = 'undefined' !== typeof data.login;

    var myBaseURL='https://forbb.herokuapp.com/api/bbapi';

    $scope.log=function () {
        $scope.isDisable=true;
        $http.get(myBaseURL+'/login?login='+$scope.login+'&code='+$scope.code).then(
            function (response) {
                // console.log(response.data);
                if ($.parseXML(response.data).getElementsByTagName('loggedIn').length>0) {
                    credentials.set({'login':$scope.login, 'code':$scope.code});
                    $scope.register = true;
                }
            },
            function (response) {
                console.log(response.status+", "+response.data);
            }
        );
    };
}]);