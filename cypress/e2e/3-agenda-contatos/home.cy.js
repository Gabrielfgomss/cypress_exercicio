/// <reference types="cypress" />

describe("Testando a página home", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve renderizar a página", () => {
    cy.get(".sc-gLDzan").should("have.text", "Adicionar");
  });

  it("Deve adicionar um item corretamente", () => {
    cy.get(".sc-iAEyYk .contato")
      .its("length")
      .then((initialLength) => {
        cy.get('[type="text"]').type("Gabriel Gomes");
        cy.get('[type="email"]').type("gabriel@hotmail.com");
        cy.get('[type="tel"]').type("11 12235-6789");
        cy.get(".adicionar").click();

        cy.get(".sc-iAEyYk .contato").should("have.length", initialLength + 1);
      });
  });

  it("Deve editar um item", () => {
    cy.get(".edit").first().click();

    cy.get('[type="text"]').clear().type("Gian Gomes");
    cy.get('[type="email"]').clear().type("giangomes@hotmail.com");
    cy.get('[type="tel"]').clear().type("11 12235-6789");
    cy.get(".alterar").click();

    cy.get(":nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(1)").should(
      "have.text",
      "Gian Gomes"
    );
    cy.get(":nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(2)").should(
      "have.text",
      "11 12235-6789"
    );
    cy.get(":nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(3)").should(
      "have.text",
      "giangomes@hotmail.com"
    );
  });

  it("Deve remover um item corretamente", () => {
    cy.get(".sc-iAEyYk .contato")
      .its("length")
      .then((initialLength) => {
        cy.get(".delete").first().click();

        cy.get(".sc-iAEyYk .contato").should("have.length", initialLength - 1);
      });
  });
});
