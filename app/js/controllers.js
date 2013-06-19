/*global
    angular
 */

(function(angular) {
    "use strict";

    angular.module("controllers", []).

        controller("taskListController", [
            "$scope",
            "localStorage",

            function($scope, storage) {
                $scope.tasks = storage;
                storage.fetchTasks();

                $scope.addNewTask = function(newTaskTitle) {
                    var newTask;

                    if (!newTaskTitle) { return; }

                    newTask = {
                        title: newTaskTitle,
                        description: "",
                        duration: 0,
                        done: false
                    };

                    $scope.newTaskTitle = null;
                    storage.addNewTask(newTask);
                    storage.synchronize();
                };

                $scope.deleteTask = function(taskIndex) {
                    storage.deleteTask(taskIndex);
                    storage.synchronize();
                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;
                    storage.synchronize();
                };

                $scope.editTask = function() {
                    storage.synchronize();
                };


                $scope.viewState = {};
                $scope.viewState.taskInEditMode = null;
                $scope.showHideTaskEditDialog = function(taskIndex) {
                    $scope.viewState.taskInEditMode = taskIndex;
                    $scope.viewState.taskInDeleteMode = null;
                };
                $scope.viewState.taskInDeleteMode = null;
                $scope.showHideTaskDeleteDialog = function(taskIndex) {
                    $scope.viewState.taskInDeleteMode = taskIndex;
                    $scope.viewState.taskInEditMode = ($scope.viewState.taskInEditMode === taskIndex) ? taskIndex : null;
                };
            }
        ]);
}(angular));