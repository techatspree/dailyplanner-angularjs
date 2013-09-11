/*global
 angular
 */

(function (angular) {
    "use strict";

    angular.module("services", [])

        .factory("localTaskStorage", [
            "$window",

            function ($window) {
                return {
                    saveTasks: function (tasks) {
                        $window.localStorage.setItem("tasks", angular.toJson(tasks));
                    },

                    getTasks: function () {
                        return angular.fromJson($window.localStorage.getItem("tasks") || '[]');
                    }
                };
            }
        ]);
}(angular));