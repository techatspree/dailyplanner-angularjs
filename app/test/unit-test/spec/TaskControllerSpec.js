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

        scope.tasks.push(task);
        expect(scope.tasks.length).toEqual(1);

        scope.removeTask(task);
        expect(scope.tasks.indexOf(task)).toEqual(-1);
    });

    it("should set task done", function() {
        var task;

        task = {
            title: "New task",
            done: false
        };
        
        scope.tasks.push(task);
        expect(scope.tasks.length).toEqual(1);
        expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(false);
                
        scope.toggleTaskStatus(task);
        
        expect(scope.tasks[scope.tasks.indexOf(task)].done).toEqual(true);
    });

});
