

import "jasmine";


import config from ".";


describe("config", () => {

    it("config.env.browser === true", () => {

        if(config && config.env){

            expect(config.env.browser).toBe(true);

        }

    });

});
