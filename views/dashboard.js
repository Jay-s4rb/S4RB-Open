angular.module('tr').controller('dashboardController', ['$scope', '$http', '$database',
    function ($scope, $http, $database) {
        //default year
        $scope.selectedYear = 2017;

        //dict to keep track of years
        $scope.years = {};
        //just in case it takes a while show some loading text based on this bool
        $scope.ready = false;

        //get our data
        $database.get().then(function (response) {
            if (response.data) {
                for (var i in  response.data) {
                    var value = response.data[i];
                    //get the year and month
                    console.log("value", value);
                    var valueDate = new Date(value.Month);
                    console.log("valueDate", valueDate);
                    //now we have data we can map into a scope dict
                    var year = valueDate.getFullYear();
                    var month = valueDate.getMonth();
                    if (!$scope.years[year]) {
                        //default to 0 to show missing months
                        $scope.years[year] = {};
                        for (var i = 0; i < 12; i++) {

                            $scope.years[year][i] = {UnitsSold: 0, Complaints: 0}
                        }
                    }
                    //and map
                    $scope.years[year][month] = value;
                    //set ready to true
                    $scope.ready = true;

                }
            }
        }, function (error) {
            //something went wrong
            console.log("an error occurred with database.get()", error);
        });

    }])
;