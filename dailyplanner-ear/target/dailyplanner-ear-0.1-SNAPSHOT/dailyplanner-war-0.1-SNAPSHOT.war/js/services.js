/*global
    angular,
    localStorage,
    JSON
 */

(function (angular) {
    "use strict";

    angular.module("services", ["ngResource"]).

        factory("composePath", [
            "$location",

            function ($location) {
                return function (path) {
                    var protocoll = $location.protocol(),
                        host = $location.host(),
                        port = $location.port();

                    // weird AngularJS bug, I have to give the port twice (hint on IRC from sigurding)
                    return protocoll + "://" + host + ":" + port + "\\:" + port + path;
                };
            }
        ]).

        factory("buildResource", [
            "$resource",
            "composePath",

            function ($resource, composePath) {
                var basePath = "/dailyplanner/rest/";

                return function (resourcePath, resourceSpec) {
                    var path = basePath + resourcePath,
                        resourceUrl = composePath(path);

                    return $resource(resourceUrl, {}, resourceSpec);
                };
            }
        ]).

        factory("authentication", [
            "buildResource",

            function (buildResource) {
                return {
                    getAuthenticatedUserId: function () {
                        return buildResource("currentuserid", {});
                    },
                    session: function () {
                        return buildResource("session", {});
                    }
                };
            }
        ]).

        factory("dailyPlanResource", [
            "buildResource",

            function (buildResource) {
                return buildResource("plan", {
                    save: {method: 'POST', isArray: true}
                });
            }
        ]).

        factory("remoteStorage", [
            "dailyPlanResource",
            "$log",

            function (dailyPlanResource, $log) {
                return {
                    data: [],

                    fetchTasks: function() {
                        var self = this;

                        dailyPlanResource.query(function(result) {
                            self.data = result;
                        });
                    },

                    addNewTask: function(newTask) {
                        this.data.push(newTask);
                    },

                    deleteTask: function(taskIndex) {
                        this.data.splice(taskIndex, 1);
                    },

                    synchronize: function() {
                        var self = this;
                        dailyPlanResource.save({}, this.data, function() {
                            // success
                            self.fetchTasks();
                        }, function() {
                            // failure
                            $log.error("Could not save my daily plan.");
                        });
                    }
                };
            }
        ]);
}(angular));