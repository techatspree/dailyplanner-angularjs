/*global
    angular
 */

(function(angular) {
    "use strict";

    angular.module("filters", []).

        filter("durationFormat", [
            function() {
                return function(input) {
                    var output, hours, minutes;

                    if (isNaN(input) || input === 0) { return; }

                    hours = (input >= 60) ? parseInt(input / 60, 10).toString() : "0";
                    output = (input < 600) ? "0" + hours : hours;
                    output += "h ";

                    minutes = (input % 60).toString();
                    output += (input % 60 < 10) ? "0" + minutes : minutes;
                    output += "m";

                    return output;
                };
            }
        ]);
}(angular));