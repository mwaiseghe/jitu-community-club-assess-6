/// <reference types="cypress" />

describe('Register Form', {
    baseUrl: "http://localhost:5500/client",
    }, () => {
    it("should load the register form", () => {
        cy.visit("/index.html");
        cy.get("form");
    });

    it("Should have all the required form fields", () => {
        cy.visit("/index.html");
        cy.get("form");
        cy.get("#first_name");
        cy.get("#last_name");
        cy.get("#email");
        cy.get("#phone_number");
        cy.get("#gender");
        cy.get("#cohort_number");
        cy.get("#description");
        cy.get('button');     
    });

    it("Should have the correct url", () => {
        cy.visit("/index.html");
        cy.url().should("include", "/index.html");
    });

    it("Should return an error if email is not in the correct format", () => {
        cy.visit("/index.html");
        cy.get("#first_name").type("Gift");
        cy.get("#last_name").type("Mwaiseghe");
        cy.get("#email").type("gift.mwaiseghe@thejitu");
        cy.get("#phone_number").type("0700000000");
        cy.get("#gender").type("Male");
        cy.get("#cohort_number").type("1");
        cy.get("#description").type("I develop");
        cy.get('button').click();
        cy.get("#message").should("contain", "Email must be in the format: gift.mwaiseghe@thejitu.com");
    });
});