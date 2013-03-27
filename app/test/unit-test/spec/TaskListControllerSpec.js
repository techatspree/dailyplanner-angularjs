/*global
    describe, it, expect,
    beforeEach, afterEach,
    module, inject
*/

(function(describe, it, expect, beforeEach, afterEach, module, inject) {
    "use strict";

    describe("TaskListController", function() {
        var scope, controller, task, localStorageMock;

        beforeEach(module("Controllers"));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();

            localStorageMock = (function() {
                var tasks = [];

                return {
                    get: function() {
                        return tasks;
                    },
                    post: function(task) {
                        tasks.push(task);
                    },
                    put: function(task) {
                        var index = tasks.indexOf(task);
                        tasks[index] = task;
                    },
                    delete: function(task) {
                        tasks.splice(tasks.indexOf(task), 1);
                    }
                };
            }());

            controller = $controller(
                "TaskListController",
                {
                    $scope: scope,
                    LocalStorage: localStorageMock
                }
            );

            task = {
                title: "New task",
                description: "...",
                duration: "15",
                done: false
            };
        }));


        it("should add a new task", function() {
            expect(scope.tasks.length).toEqual(0);

            scope.addTask(task);
            expect(scope.tasks.length).toEqual(1);
        });

        it("should remove a task", function() {
            scope.tasks.push(task);
            expect(scope.tasks.indexOf(task)).toEqual(0);

            scope.removeTask(task);
            expect(scope.tasks.indexOf(task)).toEqual(-1);
        });

        it("should set a task done", function() {
            scope.tasks.push(task);
            expect(scope.tasks.length).toEqual(1);
            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(false);

            scope.toggleTaskStatus(task);

            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(true);
        });

        it("should match duration shortcut pattern '1h 25m'", function() {
            var input, matchedInput;

            input = "New task 1h 25m";
            matchedInput = "";

            expect(matchedInput).toEqual("");

            matchedInput = controller.matchPattern(input);

            expect(matchedInput[0]).toEqual(" 1h 25m");
            expect(matchedInput[1]).toEqual(" 1h");
            expect(matchedInput[2]).toEqual(" 25m");
        });

        it("should get task title 'New task'", function() {
            var input, title;

            input = "New task 1h 25m";
            title = "";

            expect(title).toEqual("");

            title = controller.getTitle(function(str) {
                return str.match(/(\s*[0-9]+h)?(\s*[0-9]+m)?$/);
            }, input);

            expect(title).toEqual("New task");
        });

        it("should get task duration in minutes '85'", function() {
            var input, duration;

            input = "New task 1h 25m";
            duration = 0;

            expect(duration).toEqual(0);

            duration = controller.getDuration(function(str) {
                return str.match(/(\s*[0-9]+h)?(\s*[0-9]+m)?$/);
            }, input);

            expect(duration).toEqual(85);
        });

    });
}(describe, it, expect, beforeEach, afterEach, module, inject));
