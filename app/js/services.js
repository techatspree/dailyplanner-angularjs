/*global
     angular,
     localStorage,
     JSON
 */

(function(angular, localStorage, JSON) {
    "use strict";

    angular.module("services", []).

        factory("localStorage", [
            function() {
                return {
                    data: [],

                    synchronize: function() {
                        localStorage.setItem("tasks", JSON.stringify(this.data));
                    },

                    fetchTasks: function() {
                        this.data = JSON.parse(localStorage.getItem("tasks") || '[]');
                    },

                    addNewTask: function(newTask) {
                        this.data.push(newTask);
                    },

                    deleteTask: function(taskIndex) {
                        this.data.splice(taskIndex, 1);
                    }
                };
            }
        ]);
}(angular, localStorage, JSON));