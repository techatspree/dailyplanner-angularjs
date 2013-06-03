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
                var tasks;

                tasks = [];

                return {
                    getItems: function() {
                        return tasks;
                    },
                    addItem: function(task) {
                        tasks.push(task);
                    },
                    editItem: function(task) {
                        var index = tasks.indexOf(task);
                        tasks[index] = task;
                    },
                    deleteItem: function(task) {
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
                description: "text",
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

            scope.deleteTask(task);
            expect(scope.tasks.indexOf(task)).toEqual(-1);
        });

        it("should set a task done", function() {
            scope.tasks.push(task);
            expect(scope.tasks.length).toEqual(1);
            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(false);

            scope.toggleTaskStatus(task);

            expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(true);
        });

    });

}(describe, it, expect, beforeEach, afterEach, module, inject));
