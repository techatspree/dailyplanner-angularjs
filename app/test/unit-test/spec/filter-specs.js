/*global
    describe, it, expect,
    beforeEach, afterEach,
    module, inject
*/

(function(describe, it, expect, beforeEach, afterEach, module, inject) {
    "use strict";

    describe("filters", function() {

        describe("durationFormat", function() {

            beforeEach(module("filters"));

            it("should format 150 minutes to '02h 30m'", inject(function($filter) {
                var input, formattedInput;

                input = 150;
                formattedInput = "";

                expect(formattedInput).toEqual("");

                formattedInput = $filter("durationFormat")(input);

                expect(formattedInput).toEqual("02h 30m");
            }));

        });

    });

}(describe, it, expect, beforeEach, afterEach, module, inject));
