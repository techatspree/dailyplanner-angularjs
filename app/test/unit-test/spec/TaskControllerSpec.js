describe("TaskListController", function() {

    var scope, controller;

    beforeEach(function() {
        scope = {};
        controller = new TaskListController(scope);
    });

    it("should add a new task", function() {
        var task;

        task = {
            title: "New task",
            duration: 30
        };

        expect(scope.tasks.length).toEqual(0);

        scope.addTask(task);
        expect(scope.tasks.length).toEqual(1);
    });

});