/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("controllers", [])

        .controller("taskListController", [
            "$scope",
            "localTaskStorage",

            function ($scope, storage) {
                $scope.tasks = storage.getTasks();

                $scope.newTaskTitle = null;
                $scope.selectedTaskIndex = null;


                $scope.showTaskDeleteView = function () {
                    $scope.$broadcast("showTaskDeleteView");
                };

                $scope.hideTaskDeleteView = function () {
                    $scope.$broadcast("hideTaskDeleteView");
                };


                $scope.selectTask = function (taskIndex) {
                    if ($scope.selectedTaskIndex) {
                        $scope.saveTask();
                    }

                    $scope.selectedTaskIndex = taskIndex;
                };


                $scope.addNewTask = function () {
                    var newTask;

                    if (!$scope.newTaskTitle) { return; }

                    newTask = {
                        title: $scope.newTaskTitle,
                        description: "",
                        duration: 0,
                        done: false
                    };

                    $scope.selectedTaskIndex = null;
                    $scope.newTaskTitle = null;
                    $scope.tasks.unshift(newTask);
                    storage.saveTasks($scope.tasks);
                };

                $scope.deleteTask = function (taskIndex) {
                    $scope.selectedTaskIndex = null;

                    $scope.tasks.splice(taskIndex, 1);
                    storage.saveTasks($scope.tasks);
                };

                $scope.toggleTaskStatus = function (task, event) {
                    if (event) { event.stopPropagation(); }

                    $scope.selectedTaskIndex = null;

                    task.done = !task.done;

                    $scope.tasks.sort(function (a, b) {
                        return (a.done ? 1 : 0) - (b.done ? 1 : 0);
                    });

                    storage.saveTasks($scope.tasks);
                };

                $scope.saveTask = function () {
                    $scope.selectedTaskIndex = null;
                    storage.saveTasks($scope.tasks);
                };
            }
        ]);
}(angular));