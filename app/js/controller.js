"use strict";

var TaskListController = function ($scope) {
    var tasks = $scope.tasks = [];

    $scope.addTask = function(newTask) {
        var title, duration;

        if (!newTask) { return; }

        title = newTask;
        duration = newTask.duration || 0;
        
        tasks.push({
            title: title,
            duration: duration,
            class: "",
            done: false
        });

        $scope.newTask = null;
    };

    $scope.removeTask = function(task) {
        tasks.splice(tasks.indexOf(task), 1);
    };

    $scope.toggleTaskStatus = function(task) {
        task.done = !task.done;
        task.class =  (task.done) ? "task-done" : "";
    };

}

TaskListController.prototype.matchPattern = function (str) {
    return str.match(/(\s*[0-9]+h)?(\s*[0-9]+m)?$/);
};

TaskListController.prototype.getTitle = function(matcher, str) {
    var matchedInput, title;

    matchedInput = matcher(str);

    title = (matchedInput[0])
        ? matchedInput.input.replace(matchedInput[0], "")
        : matchedInput.input;
        
    return title;
};
