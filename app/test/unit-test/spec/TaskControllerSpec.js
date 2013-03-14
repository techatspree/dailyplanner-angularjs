describe("TaskListController", function() {

    var scope, controller;

    beforeEach(function() {
        scope = {};
        controller = new TaskListController(scope);
    });

    it("should add a new task", function() {
        var task;

        task = { title: "New task" };

        expect(scope.tasks.length).toEqual(0);

        scope.addTask(task);
        expect(scope.tasks.length).toEqual(1);
    });

    it("should remove task", function() {
        var task;

        task = { title: "New task" };
        scope.addTask(task);
        expect(scope.tasks.length).toEqual(1);
        
        task = scope.tasks[0];
        scope.removeTask(task);
        expect(scope.tasks.indexOf(task)).toEqual(-1);
    });

});
