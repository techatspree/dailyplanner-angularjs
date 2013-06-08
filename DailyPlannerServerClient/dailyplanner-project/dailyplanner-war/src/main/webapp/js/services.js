/*global
 angular,
 localStorage,
 JSON
 */

(function (angular) {
    "use strict";


    angular.module("Services", ["ngResource"]).
        factory("authentication", [ function () {
            return {
                getAuthenticatedUserId: function () {
                    return "user0";
                }
            }
        }]).
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
        factory("dailyPlanResource", [ "$resource", "$location", "$log", "composePath", "authentication",
            function ($resource, $location, $log, composePath, authentication) {

                var path = '/dailyplanner/rest/plans/' + authentication.getAuthenticatedUserId();
                var resourceUrl = composePath(path);
                $log.log("resourceUrl=" + resourceUrl);
                return $resource(resourceUrl, {}, {
                    query: {method: 'GET', isArray: true}
                });
            }]);
}(angular));
