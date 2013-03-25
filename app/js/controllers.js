/*global
    angular
*/

(function() {
    "use strict";

    angular.module("Controllers", []).

        controller("TaskListController", TaskListController);


    // TaskListController    
    function TaskListController($scope) {
        var self = this,
            tasks = $scope.tasks = [];

        $scope.addTask = function(newTask) {
            var title, duration;

            if (!newTask) { return; }

            title = self.getTitle(self.matchPattern, newTask.toString());
            duration = self.getDuration(self.matchPattern, newTask.toString());

            tasks.push({
                title: title,
                duration: duration,
                done: false
            });

            $scope.newTask = null;
        };

        $scope.editTask = function(task) {
            var title, duration;

            // delete task with empty title
            if (!task.title) {
                $scope.removeTask(task);
                return;
            }

            // return if duration hasn't changed
            if (!self.matchPattern(task.title)[0]) {
                return;
            }

            title = self.getTitle(self.matchPattern, task.title);
            duration = self.getDuration(self.matchPattern, task.title);

            task.title = title;
            task.duration = duration;
        };

        $scope.removeTask = function(task) {
            tasks.splice(tasks.indexOf(task), 1);
        };

        $scope.toggleTaskStatus = function(task) {
            task.done = !task.done;
        };
    }

    TaskListController.$inject = ["$scope"];


    // Prototype functions
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

    TaskListController.prototype.getDuration = function(matcher, str) {
        var matchedInput, duration, h, m;

        matchedInput = matcher(str);

        duration = 0;

        if (matchedInput[1]) {
            h = parseInt(matchedInput[1].replace(/\s|h/, ""), 10);
            duration = h * 60;
        }

        if (matchedInput[2]) {
            m = parseInt(matchedInput[2].replace(/\s|m/, ""), 10);
            duration += m;
        }

        return duration;
    };

}());
