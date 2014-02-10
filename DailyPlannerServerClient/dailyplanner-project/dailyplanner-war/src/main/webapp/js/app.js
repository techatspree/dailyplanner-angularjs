/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("dailyPlanner", [
        "controllers",
        "services",
        "directives",
        "filters"
    ])

        .factory("httpInterceptor", [
            "$q",
            "$window",
            "$log",

            function ($q, $window, $log) {
                return {
                    "response": function (response) {
                        // do something on success
                        var responseHeader;
                        responseHeader = response.headers();

                        if (response.data && responseHeader["content-type"].indexOf("text/html") !== -1) {
                            if (response.data.indexOf('<meta name="unauthorized" content="true">') !== -1) {
                                $log.error("unauthorized");
                                $window.location.reload();
                                return $q.reject(response);
                            }
                        }
                        return response || $q.when(response);
                    },

                    "responseError": function (rejection) {
                        // do something on error
                        return $q.reject(rejection);
                    }
                };
            }
        ])

        .config([
            "$httpProvider",

            function ($httpProvider) {
                $httpProvider.interceptors.push("httpInterceptor");
            }
        ]);
}(angular));