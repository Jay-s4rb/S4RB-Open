tr.service('$database', ['$http', function($http) {
    /*Service to provide interaction with database
    * */

    /*GET
    * returns data from api
    * */
    this.get = function() {
            return $http.get('http://localhost:3000/CPMU');
    };

}]);