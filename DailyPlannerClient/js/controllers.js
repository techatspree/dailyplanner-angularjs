"use strict";

function taskListController($scope) {
    $scope.tasks = [
        {
            title: "Task 1",
            description: "Task 1 Beschreibung",
            duration: 120,
            done: false
        },
        {
            title: "Task 2",
            description: "",
            duration: 15,
            done: false
        },
        {
            title: "Task 3",
            description: "Task 3 Beschreibung",
            duration: 40,
            done: false
        }
    ];
}