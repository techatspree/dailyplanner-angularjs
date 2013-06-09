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
        factory("buildResource", [ "$resource", "composePath",
            function ($resource, composePath) {
                var basePath = "/dailyplanner/rest/";

                return function (resourcePath, resourceSpec) {
                    var path = basePath + resourcePath;
                    var resourceUrl = composePath(path);

                    return $resource(resourceUrl, {}, resourceSpec);
                }
            }
        ]).
        factory("authentication", [ "$log", "buildResource",
            function ($log, buildResource) {

                return {
                    getAuthenticatedUserId: function () {
                        return buildResource("currentuserid", {
                            get: {method: 'GET', isArray: false}
                        });
                    },
                    session: function () {
                        return buildResource("session", {
                            delete: {method: "DELETE"}
                        });
                    }
                }
            }]).
        factory("dailyPlanResource", [ "$log", "buildResource",
            function ($log, buildResource) {

                return buildResource("plan", {
                    query: {method: 'GET', isArray: true},
                    save: {method: 'POST', isArray: true}
                });

            }]);
}(angular));
