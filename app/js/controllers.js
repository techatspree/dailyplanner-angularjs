"use strict";

function TaskListController($scope) {
    $scope.tasks = [
        {
            title: "Task 1",
            duration: 30
        },
        {
            title: "Task 2",
            duration: 20
        },
        {
            title: "Task 3",
            duration: 15
        }
    ];
}

TaskListController.$inject = ["$scope"];
