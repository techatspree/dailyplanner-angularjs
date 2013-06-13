/*global
    angular
*/

(function(angular) {
    "use strict";

    // add controller to controllers module
    angular.module("controllers", []).
        controller("taskListController", [
            "$scope",
            "dailyPlanLocalStorage",
            "filterFilter",

            function($scope, storage, filter) {
                var tasks;
                $scope.tasks = tasks = storage.getTasks();

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

                $scope.editTask = function() {
                    storage.saveTasks();
                };

                $scope.deleteTask = function(taskId) {
                    tasks.splice(taskId, 1);
                    storage.saveTasks();
                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;
                    storage.saveTasks();
                };
            }
        ]);
}(angular));