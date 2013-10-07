(function () {
    "use strict";

    describe("E2E Tests", function () {

        describe("add new task", function () {
            it('should add a new task to the task-list', function () {
                browser().navigateTo("/dailyplanner/pages/index.html");

                element("#task-list", "add new task").query(function (taskList, done) {
                    // count existing tasks
                    var numberOfTasks = taskList.children().length;

                    // add new task
                    input("newTaskTitle").enter("new task");
                    element("#add-new-task-form button:submit", "add new task").click();

                    expect(repeater("#task-list li", "").count()).toBe(numberOfTasks + 1);
                    done();
                });
            });
        });

    });
}());