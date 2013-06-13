/*global
 describe, it, expect,
 beforeEach, afterEach,
 module, inject
 */

(function(describe, it, expect, beforeEach, afterEach, module, inject) {
    "use strict";

    describe("TaskListController", function() {
        var scope, controller, localStorageMock;


        beforeEach(module("controllers"));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();

            localStorageMock = (function() {
                var tasks;

                tasks = [];

                return {
                    getTasks: function() {
                        return tasks;
                    },
                    saveTasks: function() {}
                };
            }());

            controller = $controller("taskListController", {
                $scope: scope,
                dailyPlanLocalStorage: localStorageMock
            });
        }));


        it("should add a new task", function() {
            var newTaskTitle = "new task";

            expect(scope.tasks.length).toEqual(0);

            scope.addNewTask(newTaskTitle);
            expect(scope.tasks.length).toEqual(1);
        });

        it("should remove a task", function() {
            var task = {
                title: "test task",
                description: "description",
                duration: "15",
                done: false
            };
            scope.tasks.push(task);

            expect(scope.tasks.indexOf(task)).toEqual(0);

            scope.deleteTask(scope.tasks.indexOf(task));

            expect(scope.tasks.indexOf(task)).toEqual(-1);
        });

        it("should set a task done", function() {
            var task = {
                title: "test task",
                description: "description",
                duration: "15",
                done: false
            };
            scope.tasks.push(task);

            expect(scope.tasks.length).toEqual(1);
            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(false);

            scope.toggleTaskStatus(task);

            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(true);
        });

    });

}(describe, it, expect, beforeEach, afterEach, module, inject));
