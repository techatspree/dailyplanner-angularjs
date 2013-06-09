/*global
 angular,
 localStorage,
 JSON
 */

(function (angular) {
    "use strict";


    angular.module("Services", ["ngResource"]).
        factory("composePath", [ "$location",
            function ($location) {

                return function (path) {
                    var protocoll = $location.protocol();
                    var host = $location.host();
                    var port = $location.port();
                    // weird AngularJS bug, I have to give the port twice (hint on IRC from sigurding)
                    return protocoll + "://" + host + ":" + port + "\\:" + port + path;
                }
            }]).
        factory("authentication", [ "$log", "composePath", "$resource",
            function ($log, composePath, $resource) {

                return {
                    getAuthenticatedUserId: function () {
                        var path = '/dailyplanner/rest/currentuserid';
                        var resourceUrl = composePath(path);

                        return $resource(resourceUrl, {}, {
                            get: {method: 'GET', isArray: false}
                        });

                    },
                    logout: function () {
                        $log.log("I should logout...");
                    }
                }
            }]).
        factory("dailyPlanResource", [ "$resource", "$location", "$log", "composePath",
            function ($resource, $location, $log, composePath) {

                var path = '/dailyplanner/rest/plan';
                var resourceUrl = composePath(path);

                return $resource(resourceUrl, {}, {
                    query: {method: 'GET', isArray: true},
                    save: {method: 'POST', isArray: true}
                });
            }]);
}(angular));
