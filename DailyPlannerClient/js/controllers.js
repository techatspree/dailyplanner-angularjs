/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("controllers", []).

        controller("taskListController", [
            "$scope",

            function ($scope) {
                $scope.tasks = [];

                $scope.addNewTask = function (newTaskTitle) {
                    var newTask;

                    if (!newTaskTitle) { return; }

                    newTask = {
                        title: newTaskTitle,
                        description: "",
                        duration: 0,
                        done: false
                    };

                    $scope.newTaskTitle = null;
                    $scope.tasks.push(newTask);
                };

                $scope.deleteTask = function (taskIndex) {
                    $scope.tasks.splice(taskIndex, 1);
                };

                $scope.toggleTaskStatus = function (task) {
                    task.done = !task.done;
                };
            }
        ]);
}(angular));