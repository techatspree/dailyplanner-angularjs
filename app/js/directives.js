/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("Directives", []).

        constant("PARTIAL_PATH", "partials/").

        directive("task", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    templateUrl: PARTIAL_PATH + "task.html",
                    restrict: "A",
                    replace: true,
                    link: function postLink(scope, element, attrs) {
                        scope.showEditMode = function(index) {
                            scope.modelState.selectedItem = index;
                            scope.modelState.editMode = index;
                            scope.modelState.deleteDialog = null;
                        };

                        scope.showTaskDeleteDialog = function(index) {
                            scope.modelState.selectedItem = index;
                            scope.modelState.editMode = (scope.modelState.editMode === index) ? scope.modelState.editMode : null;
                            scope.modelState.deleteDialog = index;
                        };
                    }
                };
            }
        ]).

        directive("taskViewMode", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    templateUrl: PARTIAL_PATH + "task_view.html",
                    replace: true,
                    link: function(scope, element, attrs) {}
                };
            }
        ]).

        directive("taskEditMode", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    templateUrl: PARTIAL_PATH + "task_edit.html",
                    link: function(scope, element, attrs) {

                        element.find("form input").bind("blur", function() {
                            scope.editTask(scope.task);
                        });

                        scope.submit = function(task) {
                            scope.editTask(task);
                            scope.modelState.selectedItem = null;
                            scope.modelState.editMode = null;
                            scope.modelState.deleteDialog = null;
                        };

//                        element.css({"height": "80px"}).animate({"height": "236px"}, 200);
//                        element.find("div").css({"height": "80px"}).animate({"height": "236px"}, 200);
                    }
                };
            }
        ]).

        directive("taskDeleteDialog", [
            "PARTIAL_PATH",
            "$timeout",

            function(PARTIAL_PATH, $timeout) {
                return {
                    restrict: "A",
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task_delete_dialog.html",

                    link: function postLink(scope, element, attrs) {
                        var slideIn, slideOut;

                        slideIn = function() {
                            element.animate({"left": "0"}, 200);
                        };

                        slideOut = function(callback) {
                            element.animate({"left": "100%"}, 200);
                        };

                        slideIn(null);

                        scope.cancel = function() {
                            slideOut();

                            $timeout(function() {
                                scope.modelState.deleteDialog = null;
                            }, 200);
                        };

                        scope.submit = function(task) {
                            scope.modelState.selectedItem = null;
                            scope.modelState.editMode = null;
                            scope.modelState.deleteDialog = null;

                            scope.deleteTask(task);
                        };
                    }
                };
            }
        ]);

}(angular));
