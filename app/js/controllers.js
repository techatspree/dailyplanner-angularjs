/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("controllers", []).
        controller("taskListController", [
            "$scope",
            "localStorage",
            "filterFilter",

            function($scope, storage, filter) {
                var tasks;

                $scope.tasks = tasks = storage;
                storage.fetchTasks();

                $scope.remainingTasks = 0;
                $scope.completedTasks = 0;
                $scope.$watch('tasks', function () {
                    $scope.remainingTasks = filter(tasks.data, {done: false}).length || 0;
                    $scope.completedTasks = filter(tasks.data, {done: true}).length || 0;
                }, true);


                $scope.taskInEditMode = null;
                $scope.showTaskEditDialog = function(taskIndex) {
                    $scope.taskInEditMode = taskIndex;
                };
                $scope.$on("hideTaskEditDialog", function() {
                    $scope.taskInEditMode = null;
                });

                $scope.taskInDeleteMode = null;
                $scope.showTaskDeleteDialog = function(taskIndex) {
                    $scope.taskInDeleteMode = taskIndex;
                };
                $scope.$on("hideTaskDeleteDialog", function() {
                    $scope.taskInDeleteMode = null;
                });


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
        ]);
}(angular));