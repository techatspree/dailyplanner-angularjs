/*global
    angular
*/

(function(angular) {
    "use strict";

    // add controller to controllers module
    angular.module("Controllers", []).
        controller("TaskListController", ["$log", "$scope","filterFilter","dailyPlanResource",

            function($log, $scope, filter, dailyPlanResource) {

                $scope.tasks = dailyPlanResource.query();

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


                $scope.addTask = function(taskTitle) {

                    if (!taskTitle) { return; }

                    var newTask = {
                        id : null,
                        title: taskTitle,
                        description: "..",
                        duration: 0,
                        done: false
                    };

                    $scope.tasks.push(newTask);
                    $scope.newTask = null;

                    $scope.synchronizeWithServer();
                };

                $scope.editTask = function(task) {
                    var index = $scope.tasks.indexOf(task);
                    if (index !== -1) {
                        $scope.tasks[index] = task;
                    }
                    $scope.synchronizeWithServer();
                };

                $scope.deleteTask = function(task) {
                    var index = $scope.tasks.indexOf(task);
                    if (index !== -1) {
                        $scope.tasks.splice(index, 1);
                    }
                    $scope.synchronizeWithServer();
                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;
                    $scope.synchronizeWithServer();
                };

                $scope.synchronizeWithServer = function() {
                    dailyPlanResource.save({}, $scope.tasks, function() {
                        // success
                        $scope.tasks = dailyPlanResource.query();
                    }, function() {
                        // failure
                        $log.error("Could not save my daily plan.");
                    });

                }
            }
        ]);

}(angular));
