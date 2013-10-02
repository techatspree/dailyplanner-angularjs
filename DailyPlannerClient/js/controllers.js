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
                $scope.selectedTask = null;


                $scope.showTaskDeleteView = function () {
                    $scope.$broadcast("showTaskDeleteView");
                };

                $scope.hideTaskDeleteView = function () {
                    $scope.$broadcast("hideTaskDeleteView");
                };


                $scope.selectTask = function (taskIndex) {
                    if ($scope.selectedTask) {
                        $scope.saveTask();
                    }

                    $scope.selectedTask = {};
                    $scope.selectedTask.index = taskIndex;
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

                    $scope.selectedTask = null;
                    $scope.newTaskTitle = null;
                    $scope.tasks.unshift(newTask);
                    storage.saveTasks($scope.tasks);
                };

                $scope.deleteTask = function (taskIndex) {
                    $scope.selectedTask = null;

                    $scope.tasks.splice(taskIndex, 1);
                    storage.saveTasks($scope.tasks);
                };

                $scope.toggleTaskStatus = function (task, event) {
                    if (event) { event.stopPropagation(); }

                    $scope.selectedTask = null;

                    task.done = !task.done;

                    $scope.tasks.sort(function (a, b) {
                        return a.done - b.done;
                    });

                    storage.saveTasks($scope.tasks);
                };

                $scope.saveTask = function () {
                    $scope.selectedTask = null;
                    storage.saveTasks($scope.tasks);
                };
            }
        ]);
}(angular));