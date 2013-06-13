/*global
    angular,
    localStorage,
    JSON
*/

(function(angular, localStorage, JSON) {
    "use strict";

    angular.module("services", []).

        factory("dailyPlanLocalStorage", [

            function() {
                var dataModel, synchronizeWithLocalStorage;
                dataModel = {};
                dataModel.tasks = [];

                synchronizeWithLocalStorage = function() {
                    localStorage.setItem("tasks", JSON.stringify(dataModel.tasks));
                };

                return {
                    getTasks: function() {
                        dataModel.tasks = JSON.parse(localStorage.getItem("tasks") || '[]');
                        return dataModel.tasks;
                    },
                    saveTasks: function() {
                        synchronizeWithLocalStorage();
                    }
                };
            }
        ]);
}(angular, localStorage, JSON));