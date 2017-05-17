var tr = angular.module('tr', ["ngRoute",  'ngMaterial']);

tr.config(function($routeProvider)
{
    /*simple route setup*/
   $routeProvider.when("/", {
       templateUrl : "views/dashboard.html",
       controller : "dashboardController"
   }).otherwise({ redirectTo: '/' });
});