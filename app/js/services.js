/*global
    angular,
    localStorage
*/

(function(angular, localStorage) {
    "use strict";

    angular.module("Services", []).

        // Local Storage Services
        factory("LocalStorage", [
            function() {
                var tasks = [];

                return {
                    get: function() {
                        tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
                        return tasks;
                    },

                    post: function(task) {
                        tasks.push(task);
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    },

                    put: function(task) {
                        var index = tasks.indexOf(task);
                        tasks[index] = task;
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    },

                    delete: function(task) {
                        tasks.splice(tasks.indexOf(task), 1);
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }
                };
            }
        ]);

}(angular, localStorage));
