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
                var protocol = $location.protocol(),
                    host = $location.host(),
                    port = $location.port(),
                    basePath = "/dailyplanner/rest/v1/";

                return {
                    buildResource: function (resourcePath) {
                        var resourceUrl = protocol + "://" + host + "\\:" + port + basePath + resourcePath;

                        return $resource(resourceUrl);
                    }
                };
            }
        ])

        .factory("serverTaskStorage", [
            "resourceBuilder",
            "$log",

            function (resourceBuilder, $log) {
                var dailyPlanResource = resourceBuilder.buildResource("plan");

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
        ]);
}(angular));