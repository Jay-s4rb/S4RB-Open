tr.directive("cpmuMonth", function () {
    return {
        restrict: "E",
        scope: {
            //year: accepts a mapped year from dashboard
            year: "=",
            //quarter: accepts a bool to decide if we need to calculate quarters
            quarter: "@?",
            //year: accepts selectedYear(number) so we don't have to watch an object
            selectedYear: "="
        },
        templateUrl: "/directives/cpmuMonth.html",
        link: function (scope, elem, attrs) {
            console.log("got input", scope.quarter);
            if (angular.isUndefined(scope.quarter)) {
                scope.quarter = false;
            }

            //map is required for months that are not in dataset
            scope.monthMap = {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            };

            /*add cpmu to the objects when SelectedYear changes*/
            scope.$watch('selectedYear', function () {

                if (scope.year) {
                    angular.forEach(scope.year, function (value, month) {
                        if (value.Complaints == 0 || value.UnitsSold == 0) {
                            value.cpmu = 0;
                        }
                        else {
                            //set cpmu
                            value.cpmu = value.Complaints / value.UnitsSold * 1000000;
                        }
                    });
                    if (scope.quarter) {
                        //if we are displaying quarters map them
                        scope.quarters = {
                            1: {
                                Complaints: scope.year[0].Complaints + scope.year[1].Complaints + scope.year[2].Complaints,
                                UnitsSold: scope.year[0].UnitsSold + scope.year[1].UnitsSold + scope.year[2].UnitsSold
                            },
                            2: {
                                Complaints: scope.year[3].Complaints + scope.year[4].Complaints + scope.year[5].Complaints,
                                UnitsSold: scope.year[3].UnitsSold + scope.year[4].UnitsSold + scope.year[5].UnitsSold
                            },
                            3: {
                                Complaints: scope.year[6].Complaints + scope.year[7].Complaints + scope.year[8].Complaints,
                                UnitsSold: scope.year[6].UnitsSold + scope.year[7].UnitsSold + scope.year[8].UnitsSold
                            },
                            4: {
                                Complaints: scope.year[9].Complaints + scope.year[10].Complaints + scope.year[11].Complaints,
                                UnitsSold: scope.year[9].UnitsSold + scope.year[10].UnitsSold + scope.year[11].UnitsSold
                            }

                        };
                        angular.forEach(scope.quarters, function (value) {
                            //we set CPMU value
                            if (value.Complaints == 0 || value.UnitsSold == 0) {
                                value.cpmu = 0;
                            }
                            else {
                                value.cpmu = value.Complaints / value.UnitsSold * 1000000;
                            }
                        });
                    }
                }
            });
        }
    }
});