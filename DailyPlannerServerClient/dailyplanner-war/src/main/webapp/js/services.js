/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("services", []).

        factory("localTaskStorage", [
            "$window",

            function ($window) {
                return {
                    data: [],

                    synchronize: function () {
                        $window.localStorage.setItem("tasks", $window.JSON.stringify(this.data));
                    },

                    fetchTasks: function () {
                        this.data = $window.JSON.parse($window.localStorage.getItem("tasks") || '[]');
                    },

                    addNewTask: function (newTask) {
                        this.data.push(newTask);
                    },

                    deleteTask: function (taskIndex) {
                        this.data.splice(taskIndex, 1);
                    }
                };
            }
        ]);
}(angular));