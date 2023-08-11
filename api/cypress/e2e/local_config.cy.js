/// <reference types="cypress" />

describe("Local Config", {
    baseUrl: "http://localhost:5500/client",
    }, () => {
    it("should load the register form", () => {
        cy.visit("/index.html");
        cy.get("form");
    });

    // // check the url
    // it("should have the correct url", () => {
    //     cy.url().should("include", "/register.html");
    // }
    // );

    
});