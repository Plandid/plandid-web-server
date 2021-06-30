const utils = require("./utils");
const config = require("./config");

require("dotenv").config();


test("testing jest and only allowing commits if tests pass", function() {
    expect(true).toBe(true);
});

describe("testing getServiceIdMap", function() {
    let serviceIdMap = {};

    beforeAll(async function() {
        serviceIdMap = await utils.getServiceIdMap();
        console.log()
    });

    test("test that the map is of type object", function() {
        expect(typeof serviceIdMap).toBe("object");
    });
    test("test that this service has a name in the map", function() {
        expect(serviceIdMap.hasOwnProperty(config.serviceName)).toBeTruthy();
    });
    test("test that the map has an id for this service's name", function() {
        expect(serviceIdMap[config.serviceName]).toBe(process.env.SERVICE_ID);
    });
});