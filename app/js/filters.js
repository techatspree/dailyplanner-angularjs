/*global
    angular
*/

(function(angular) {
    "use strict";

    angular.module("Filters", []).

        filter("DurationFormat", [
            function() {
                return function(input) {
                    var output, hours, minutes;
                    output = "";

                    if (input >= 60) {
                        hours = parseInt(input / 60, 10);
                    }

                    if (input > 0) {
                        minutes = input % 60;
                    }

                    if (hours) {
                        output = hours + "h";
                    }

                    if (minutes) {
                        if (output) { output += " "; }
                        output += minutes + "m";
                    }

                    return output;
                };
            }
        ]);

}(angular));
