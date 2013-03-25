/*global
    angular,
    localStorage
*/

(function(angular, localStorage) {
    "use strict";

    angular.module("Services", []).

        // Local Storage Services
        factory("LocalStorage", [
            function() {
                return {
                    get: function () {
                        return JSON.parse(localStorage.getItem("tasks") || '[]');
                    },

                    set: function (tasks) {
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }
                };
            }
        ]);

}(angular, localStorage));
