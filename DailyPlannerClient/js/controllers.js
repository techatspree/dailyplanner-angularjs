"use strict";

function taskListController($scope) {
    $scope.tasks = [];

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
        $scope.tasks.push(newTask);
    };

    $scope.deleteTask = function (taskIndex) {
        $scope.tasks.splice(taskIndex, 1);
    };

    $scope.toggleTaskStatus = function (task) {
        task.done = !task.done;
    };
}