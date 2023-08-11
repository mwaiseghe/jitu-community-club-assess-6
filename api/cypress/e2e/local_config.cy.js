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

    it("Should have all the required form fields", () => {
        cy.get("form").within(() => {
            cy.get("#first_name");
            cy.get("#last_name");
            cy.get("#email");
            cy.get("#phone_number");
            cy.get("#gender");
            cy.get("#cohort_number");
            cy.get("#description");
        });
    });
});