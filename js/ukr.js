app.controller('ukrCtrl', ['$scope', '$http', 'credentials', function($scope, $http, credentials) {

    var myBaseURL1='https://forbb.herokuapp.com/api/bbapi';
    var myBaseURL2='https://forbb.herokuapp.com/api/bb';

    var data=credentials.get();

    $http.get(myBaseURL2+'/country').then(
        function (response) {
            console.log(response);
            var tempDom = '<div><script language="JavaScript" type="text/javascript">\n' +
                '        var $j = jQuery.noConflict();\n' +
                '    </script><b>Top League Winners</b>\n' +
                '                \n' +
                '                \n' +
                '                        <table border="0" cellpadding="1" cellspacing="1" width="100%">\n' +
                '                            <tr class="tableheader">\n' +
                '                                <td align="center" valign="top">\n' +
                '                                    Season\n' +
                '                                </td>\n' +
                '                                <td align="center" valign="top">\n' +
                '                                    Champion\n' +
                '                                </td>\n' +
                '                                <td align="center" valign="top">\n' +
                '                                    Runner-Up\n' +
                '                                </td>\n' +
                '                            </tr>\n' +
                '</table></div>';
            // console.log($.parseXML("<?xml version='1.0' encoding='utf-8'?>"+response.data));
            console.log($.parseXML(tempDom));
            console.log($.parseXML(response.data.replace("&quot;", "\"")));
            // console.log(tempDom);
            // console.log($('.tableheader'));
        }
    );

}]);