/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("controllers", [])

        .controller("taskListController", [
            "$scope",
            "localTaskStorage",
            "$log",

            function ($scope, storage, $log) {
                $scope.tasks = storage.getTasks();

                $scope.newTaskTitle = null;
                $scope.selectedTask = null;


                $scope.showTaskDeleteView = function () {
                    $scope.$broadcast("showTaskDeleteView");
                };

                $scope.hideTaskDeleteView = function () {
                    $scope.$broadcast("hideTaskDeleteView");
                };


                $scope.selectTask = function (task, taskIndex) {
                    // if there is already a task selected, try to save this task
                    if ($scope.selectedTask) {
                        if (!$scope.saveTask()) { return; }
                    }

                    $scope.selectedTask = angular.copy(task);
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
                    if ($scope.selectedTask) {
                        var taskToSaveIndex;

                        taskToSaveIndex = $scope.selectedTask.index;

                        $scope.tasks[taskToSaveIndex].title = $scope.selectedTask.title;
                        $scope.tasks[taskToSaveIndex].description = $scope.selectedTask.description;
                        $scope.tasks[taskToSaveIndex].duration = $scope.selectedTask.duration;

                        $scope.selectedTask = null;
                        storage.saveTasks($scope.tasks);

                        $log.info("saved task", $scope.tasks[taskToSaveIndex]);
                        return true;
                    } else {
                        $log.error("task could not be saved");
                        return false;
                    }
                };
            }
        ]);
}(angular));