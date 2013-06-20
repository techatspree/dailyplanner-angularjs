/*global
    angular
 */

(function(angular) {
    "use strict";

    angular.module("directives", []).

        directive("task", [
            function() {
                return {
                    restrict: "A",
                    scope: true,
                    templateUrl: "partials/task.html",
                    replace: true,
                    link: function(scope, element, attrs) {}
                };
            }
        ]).

        directive("taskView", [
            function() {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: "partials/task-view.html",
                    link: function(scope, element, attrs) {}
                };
            }
        ]).

        directive("taskEditDialog", [
            function() {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: "partials/task-edit-dialog.html",
                    link: function(scope, element, attrs) {
                        element.find("form input").blur(function() {
                            scope.$apply(function() {
                                scope.editTask();
                            });
                        });

                        element.find("form").submit(function() {
                            scope.$apply(function() {
                                scope.viewState.taskInEditMode = null;
                            });
                        });
                    }
                };
            }
        ]).

        directive("taskDeleteDialog", [
            "$timeout",

            function($timeout) {
                return {
                    restrict: "A",
                    scope: true,
                    replace: true,
                    templateUrl: "partials/task-delete-dialog.html",
                    link: function(scope, element, attrs) {
                        var slideIn, slideOut, animationDuration;

                        animationDuration = 200;

                        slideIn = function() {
                            element.animate({ "left": "0" }, animationDuration);
                        };

                        slideOut = function() {
                            element.animate({ "left": "100%" }, animationDuration);
                        };

                        slideIn();

                        scope.hideTaskDeleteDialog = function() {
                            slideOut();
                            $timeout(function() {
                                scope.viewState.taskInDeleteMode = null;
                            }, animationDuration);
                        };

                        scope.submitTaskDeleteDialog = function(taskIndex) {
                            scope.viewState.taskInDeleteMode = null;
                            scope.viewState.taskEditModeMode = null;
                            scope.deleteTask(taskIndex);
                        };
                    }
                };
            }
        ]);
}(angular));