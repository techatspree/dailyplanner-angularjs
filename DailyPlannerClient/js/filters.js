/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("filters", [])

        .filter("formatDuration", [
            function () {
                return function (input) {
                    var output, hours, minutes;

                    if (isNaN(input) || input === 0) { return undefined; }

                    hours = parseInt(input / 60, 10);
                    output = (input < 600) ? "0" + hours.toString() : hours.toString();
                    output += "h ";

                    minutes = input % 60;
                    output += (input % 60 < 10) ? "0" + minutes.toString() : minutes.toString();
                    output += "m";

                    return output;
                };
            }
        ]);
}(angular));