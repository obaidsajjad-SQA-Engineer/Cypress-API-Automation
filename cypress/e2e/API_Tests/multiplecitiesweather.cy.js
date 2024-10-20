/// <reference types="Cypress" />

const citiesJson = require("../../fixtures/cities.json");

const publicKey = "key=a1ff4c3f26eb4dee8d7162940242010";
const webURL = "https://api.weatherapi.com/v1/current.json?";

const verifyWeatherDetailsForCities = (cities) => {
    cities.forEach((city) => {
        cy.request({
            method: "GET",
            url: `${webURL}${publicKey}&q=${city}`,
        }).then((res) => {
            cy.log(`Response for ${city}: ${JSON.stringify(res)}`);
            
            expect(res.status).to.eq(200);
            expect(res.body.location.name).to.eq(city);
        });
    });
};

describe("GET Weather details of cities", () => {
    it("Verify Cities Names", () => {
        verifyWeatherDetailsForCities(citiesJson.cities);
    });
});
