function TaskListController($scope) {
    var tasks = $scope.tasks = [];

    $scope.addTask = function(newTask) {
        var title, duration;

        if (!newTask) { return; }

        title = newTask;
        duration = newTask.duration || 0;
        
        tasks.push({
            title: title,
            duration: duration
        });

        $scope.newTask = null;
    };

}
