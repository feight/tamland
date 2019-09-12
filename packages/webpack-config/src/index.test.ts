

import "jasmine";


import configure from ".";


describe("config", () => {

    it("config.env.browser === true", () => {

        const config = configure()({}, {});

        expect(config.entry).toBeDefined();

    });

});
