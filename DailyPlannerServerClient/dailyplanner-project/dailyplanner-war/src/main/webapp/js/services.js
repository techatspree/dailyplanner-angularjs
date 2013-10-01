/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("services", ["ngResource"])

        .factory("resourceBuilder", [
            "$resource",
            "$location",

            function ($resource, $location) {
                var protocoll = $location.protocol(),
                    host = $location.host(),
                    port = $location.port(),
                    basePath = "/dailyplanner/rest/";

                return {
                    buildResource: function (resourcePath, resourceSpec) {
                        var resourceUrl = protocoll + "://" + host + "\\:" + port + basePath + resourcePath;

                        return $resource(resourceUrl, {}, resourceSpec);
                    }
                };
            }
        ])

        .factory("serverTaskStorage", [
            "resourceBuilder",
            "$log",

            function (resourceBuilder, $log) {
                var dailyPlanResource = resourceBuilder.buildResource("plan", {
                    save: { method: 'POST', isArray: true }
                });

                return {
                    saveTasks: function (tasks) {
                        dailyPlanResource.save({}, tasks, function () {
                            // success
                            $log.info("Saved my daily plan.");
                        }, function () {
                            // failure
                            $log.error("Could not save my daily plan.");
                        });
                    },

                    getTasks: function () {
                        return dailyPlanResource.query();
                    }
                };
            }
        ])

        .factory("authentication", [
            "resourceBuilder",

            function (resourceBuilder) {
                return {
                    getAuthenticatedUser: function () {
                        var authenticatedUserResource = resourceBuilder.buildResource("currentuserid", {});
                        return authenticatedUserResource.get();
                    },

                    logout: function (success, failure) {
                        var sessionsResource = resourceBuilder.buildResource("session", {});
                        sessionsResource.delete(success, failure);
                    }
                };
            }
        ]);
}(angular));