/*global
    angular
 */

(function(angular) {
    "use strict";

    angular.module("controllers", []).

        controller("taskListController", [
            "$scope",
            "dailyPlanLocalStorage",

            function($scope, storage) {
                var tasks;
                $scope.tasks = tasks = storage.getTasks();

                $scope.addNewTask = function(newTaskTitle) {
                    var newTask;

                    if (!newTaskTitle) { return; }

                    newTask = {
                        title: newTaskTitle,
                        description: "",
                        duration: 0,
                        done: false
                    };

                    tasks.push(newTask);
                    $scope.newTaskTitle = null;
                    storage.saveTasks();
                };

                $scope.deleteTask = function(taskIndex) {
                    tasks.splice(taskIndex, 1);
                    storage.saveTasks();
                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;
                    storage.saveTasks();
                };
            }
        ]);
}(angular));