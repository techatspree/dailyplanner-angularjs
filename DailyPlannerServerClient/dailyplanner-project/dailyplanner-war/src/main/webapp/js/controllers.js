/*global
    angular
*/

(function(angular) {
    "use strict";

    // add controller to controllers module
    angular.module("Controllers", []).
        controller("TaskListController", ["$scope","filterFilter","dailyPlanResource",

            function($scope, filter, dailyPlanResource) {

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


                $scope.addTask = function(task) {
                    if (!task) { return; }

                    // $scope.tasks.push(task);

                    $scope.newTask = null;
                };

                $scope.editTask = function(task) {

                };

                $scope.deleteTask = function(task) {

                };

                $scope.toggleTaskStatus = function(task) {
                    task.done = !task.done;

                };
            }
        ]);

}(angular));
