function TaskListController($scope) {
    var tasks = $scope.tasks = [];

    $scope.addTask = function(newTask) {
        var title;

        if (!newTask) { return; }

        title = newTask;
        
        tasks.push({
            "title": title,
            "duration": 0
        });

        $scope.newTask = null;
    };
}