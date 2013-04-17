/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("Directives", []).

        constant("PARTIAL_PATH", "partials/").

        directive("task", [
            "PARTIAL_PATH",
            "$rootScope",

            function(PARTIAL_PATH, $rootScope) {
                return {
                    templateUrl: PARTIAL_PATH + "task.html",
                    restrict: "A",
                    replace: true,
                    link: function postLink(scope, element, attrs) {
                        scope.showEditMode = function(index) {
                            scope.state.selectedItem = index;
                            scope.state.editMode = index;
                            scope.state.removeDialog = null;
                        };

                        scope.showTaskRemoveDialog = function(index) {
                            scope.state.selectedItem = index;
                            scope.state.editMode = (scope.state.editMode == index) ? scope.state.editMode : null;
                            scope.state.removeDialog = index;
                        };
                    }
                };
            }
        ]).

        directive("taskViewMode", [
            "PARTIAL_PATH",
            "$rootScope",

            function(PARTIAL_PATH, $rootScope) {
                return {
                    templateUrl: PARTIAL_PATH + "task_view.html",
                    replace: true,
                    link: function(scope, element, attrs) {

                    }
                };
            }
        ]).

        directive("taskEditMode", [
            "PARTIAL_PATH",
            "$rootScope",
            "$timeout",

            function(PARTIAL_PATH, $rootScope, $timeout) {
                return {
                    templateUrl: PARTIAL_PATH + "task_edit.html",
                    link: function(scope, element, attrs) {

                        element.find("form input").bind("blur", function() {
                            scope.editTask(scope.task);
                        });

                        scope.submit = function(task) {
                            scope.editTask(task);
                            scope.state.selectedItem = null;
                            scope.state.editMode = null;
                            scope.state.removeDialog = null;
                        };

                        // element.css({"height": "80px"}).animate({"height": "236px"}, 200);
                        // element.find("div").css({"height": "80px"}).animate({"height": "236px"}, 200);
                   
                    }
                };
            }
        ]).

        directive("taskRemoveDialog", [
            "PARTIAL_PATH",

            function(PARTIAL_PATH) {
                return {
                    restrict: "A",
                    replace: true,
                    templateUrl: PARTIAL_PATH + "task_remove_dialog.html",

                    link: function postLink(scope, element, attrs) {
                        var slideIn, slideOut;

                        slideIn = function(callback) {
                            element.animate({"left": "0"}, 200, callback);
                        };

                        slideOut = function(callback) {
                            element.animate({"left": "100%"}, 200, callback);
                        };

                        slideIn(null);
                        
                        scope.cancel = function() {
                            slideOut(function() {
                                scope.$apply(function() {
                                    scope.state.removeDialog = null;
                                });
                            });
                        };

                        scope.submit = function(task) {
                            scope.state.selectedItem = null;
                            scope.state.editMode = null;
                            scope.state.removeDialog = null;

                            scope.removeTask(task);
                        };
                    }
                };
            }
        ]);
       



}(angular));
