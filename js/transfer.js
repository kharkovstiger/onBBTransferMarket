app.controller('transferCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL='https://forbb.herokuapp.com/api/bbapi';

    $scope.tl=[];

    var data=credentials.get();

    $scope.getTLforNT=function () {
        $scope.tl=[];
        for (var i=0;i<NTIds.length;i++){

            $http.get(myBaseURL+'/player?id='+NTIds[i]+'&login='+data.login+'&code='+data.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                        // console.log(response.data);
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    };

    $scope.getTLforNTU21=function () {
        $scope.tl=[];
        for (var i=0;i<U21Ids.length;i++){
            $http.get(myBaseURL+'/player?id='+U21Ids[i]+'&login='+data.login+'&code='+data.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    };

    $scope.getTLforList=function () {
        $scope.tl=[];
        var list=$scope.ids.split(/[, \n]/);
        console.log(list);
        for (var i=0;i<list.length;i++){
            $http.get(myBaseURL+'/player?id='+list[i]+'&login='+data.login+'&code='+data.code).then(
                function (response) {
                    // console.log(response.status+", "+response.data);
                    var sale=$.parseXML(response.data).getElementsByTagName('forSale');
                    if (sale[0].textContent==1){
                        $scope.tl.push($.parseXML(response.data));
                    }
                },
                function (response) {
                    console.log(response.status+", "+response.data);
                }
            );
        }
    }
}]);