/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("controllers", []).

        controller("taskListController", [
            "$scope",
            "localTaskStorage",
            "$timeout",

            function ($scope, storage, $timeout) {
                var animationDuration;

                animationDuration = 200;

                $scope.tasks = storage;
                storage.fetchTasks();

                $scope.taskToEdit = null;

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
                    storage.addNewTask(newTask);
                    storage.synchronize();
                };

                $scope.deleteTask = function (taskIndex) {
                    storage.deleteTask(taskIndex);
                    storage.synchronize();
                };

                $scope.toggleTaskStatus = function (task) {
                    task.done = !task.done;
                    storage.synchronize();
                };

                $scope.saveEditedTask = function (taskIndex) {
                    var regex, matchedInput, duration;

                    if (!$scope.taskToEdit) { return; }

                    regex = /([0-9]+h)?(\s*[0-9]+m)?$/;
                    matchedInput = ($scope.taskToEdit.duration) ? $scope.taskToEdit.duration.toString().match(regex) : null;

                    duration = (matchedInput && matchedInput[1]) ? parseInt(matchedInput[1].replace(/\s|h/, ""), 10) * 60 : 0;
                    duration += (matchedInput && matchedInput[2]) ? parseInt(matchedInput[2].replace(/\s|m/, ""), 10) : 0;

                    $scope.taskToEdit.duration = duration;

                    storage.data[taskIndex] = angular.copy($scope.taskToEdit);
                    $scope.taskToEdit = null;
                    $scope.viewState.taskInEditMode = null;
                    storage.synchronize();
                };

                $scope.viewState = {};
                $scope.viewState.taskInEditMode = null;
                $scope.showTaskEditView = function (taskIndex) {
                    $scope.taskToEdit = angular.copy($scope.tasks.data[taskIndex]);

                    $scope.viewState.taskInEditMode = taskIndex;
                    $scope.viewState.taskInDeleteMode = null;
                };

                $scope.viewState.taskInDeleteMode = null;
                $scope.showTaskDeleteView = function (taskIndex) {
                    $scope.viewState.taskInDeleteMode = taskIndex;
                    $scope.viewState.taskInEditMode = ($scope.viewState.taskInEditMode === taskIndex) ? taskIndex : null;
                    $timeout(function () {
                        $scope.$broadcast("showTaskDeleteView", animationDuration);
                    }, 0);
                };
                $scope.hideTaskDeleteView = function () {
                    $scope.$broadcast("hideTaskDeleteView", animationDuration);
                    $timeout(function () {
                        $scope.viewState.taskInDeleteMode = null;
                    }, animationDuration);
                };
            }
        ]);
}(angular));