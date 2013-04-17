/*global
    describe, it, expect,
    beforeEach, afterEach,
    module, inject
*/

(function(describe, it, expect, beforeEach, afterEach, module, inject) {
    "use strict";

    describe("Filters", function() {

        describe("DurationFormat Filter", function() {

            beforeEach(module("Filters"));

            it("should format 150 minutes to '02h 30m'", inject(function($filter) {
                var input, formattedInput;

                input = 150;
                formattedInput = "";

                expect(formattedInput).toEqual("");

                formattedInput = $filter("DurationFormat")(input);

                expect(formattedInput).toEqual("02h 30m");
            }));

        });

    });
}(describe, it, expect, beforeEach, afterEach, module, inject));
