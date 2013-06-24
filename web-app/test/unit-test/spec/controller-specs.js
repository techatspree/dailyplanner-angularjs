/*global
 describe, it, expect,
 beforeEach, afterEach,
 module, inject
 */

(function(describe, it, expect, beforeEach, afterEach, module, inject) {
    "use strict";

    describe("controllers", function() {
        describe("taskListController", function() {
            var scope, controller, localStorageMock;

            beforeEach(module("controllers"));

            beforeEach(inject(function($rootScope, $controller) {
                scope = $rootScope.$new();

                localStorageMock = (function() {
                    return {
                        data: [],

                        synchronize: function() {},
                        fetchTasks: function() {},
                        addNewTask: function(newTask) {
                            this.data.push(newTask);
                        },
                        deleteTask: function(taskIndex) {
                            this.data.splice(taskIndex, 1);
                        }
                    };
                }());

                controller = $controller("taskListController", {
                    $scope: scope,
                    localStorage: localStorageMock
                });
            }));


            it("should add a new task", function() {
                var newTaskTitle = "new task";

                expect(scope.tasks.data.length).toEqual(0);
                scope.addNewTask(newTaskTitle);
                expect(scope.tasks.data.length).toEqual(1);
            });

            it("should remove a task", function() {
                var task = {
                    title: "test task",
                    description: "description",
                    duration: "15",
                    done: false
                };

                scope.tasks.data.push(task);
                expect(scope.tasks.data.indexOf(task)).toEqual(0);

                scope.deleteTask(scope.tasks.data.indexOf(task));
                expect(scope.tasks.data.indexOf(task)).toEqual(-1);
            });

            it("should set a task done", function() {
                var task = {
                    title: "test task",
                    description: "description",
                    duration: "15",
                    done: false
                };

                scope.tasks.data.push(task);
                expect(scope.tasks.data.length).toEqual(1);
                expect(scope.tasks.data[scope.tasks.data.indexOf(task)].done).toEqual(false);

                scope.toggleTaskStatus(task);
                expect(scope.tasks.data[scope.tasks.data.indexOf(task)].done).toEqual(true);
            });
        });
    });
}(describe, it, expect, beforeEach, afterEach, module, inject));