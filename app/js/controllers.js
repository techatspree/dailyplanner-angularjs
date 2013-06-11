/*global
    angular
*/

(function(angular) {
    "use strict";

    // add controller to controllers module
    angular.module("controllers", []).
        controller("taskListController", [
            "$scope",
            "localStorage",
            "filterFilter",

            function($scope, storage, filter) {
                $scope.tasks = storage.getItems();

                $scope.modelState = {};
                $scope.modelState.remainingCount = 0;
                $scope.modelState.completedCount = 0;
                $scope.modelState.selectedItem = null;
                $scope.modelState.editMode = null;
                $scope.modelState.deleteDialog = null;

                $scope.$watch('tasks', function () {
                    $scope.modelState.remainingTasks = filter($scope.tasks, {done: false}).length || 0;
                    $scope.modelState.completedTasks = filter($scope.tasks, {done: true}).length || 0;
                }, true);

                $scope.showEditMode = function(index) {
                    $scope.modelState.selectedItem = index;
                    $scope.modelState.editMode = index;
                    $scope.modelState.deleteDialog = null;
                };

                $scope.showTaskDeleteDialog = function(index) {
                    $scope.modelState.selectedItem = index;
                    $scope.modelState.editMode = ($scope.modelState.editMode === index) ? $scope.modelState.editMode : null;
                    $scope.modelState.deleteDialog = index;
                };


                $scope.addTask = function(task) {
                    if (!task) { return; }

                    storage.addItem({
                        title: task,
                        // description: "...",
                        duration: 0,
                        done: false
                    });

                    $scope.newTask = null;
                };

                $scope.editTask = function(task) {
                    storage.editItem(task);
                };

                $scope.deleteTask = function(task) {
                    storage.deleteItem(task);
                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;
                    storage.editItem(task);
                };
            }
        ]);
}(angular));