/*global
    angular,
    window
*/

(function(angular, window) {
    "use strict";

    angular.module("controllers", []).
        controller("taskListController", [
            "$scope",
            "remoteStorage",
            "filterFilter",

            function($scope, storage, filter) {
                var tasks;

                $scope.tasks = tasks = storage;

                storage.fetchTasks();

                $scope.modelState = {};
                $scope.modelState.remainingCount = 0;
                $scope.modelState.completedCount = 0;
                $scope.modelState.selectedItem = null;
                $scope.modelState.editMode = null;
                $scope.modelState.deleteDialog = null;

                $scope.$watch('tasks', function () {
                    $scope.modelState.remainingTasks = filter(tasks.data, {done: false}).length || 0;
                    $scope.modelState.completedTasks = filter(tasks.data, {done: true}).length || 0;
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
                    $scope.newTaskTitle = null;
                    storage.addNewTask(newTask);
                    storage.synchronize();
                };

                $scope.editTask = function() {
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
            }
        ]).

        controller("authenticationController", [
            "$scope",
            "authentication",
            "$log",

            function($scope, authentication, $log) {
                $scope.authenticatedUser = authentication.getAuthenticatedUserId().get();

                $scope.logout = function () {
                    authentication.session().delete(function() {
                        // success
                        $log.log("Session succesfully deleted");
                        window.location.reload(true);
                    }, function() {
                        // failure
                        $log.error("Could not logout.");
                    });
                };
            }
        ]);
}(angular, window));