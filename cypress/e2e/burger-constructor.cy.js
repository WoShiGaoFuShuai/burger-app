describe("burger-constructor", () => {
  beforeEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload();
    cy.visit("http://localhost:3000/");
  });

  describe("initial state", () => {
    it("should be with empty buns on the 1st load", () => {
      cy.get("[data-constructor-emptyBun-side]")
        .first()
        .should("contain.text", "Добавьте булочку");

      cy.get("[data-constructor-emptyBun-side]")
        .last()
        .should("contain.text", "Добавьте булочку");

      cy.get("[data-constructor-emptyBun-middle]").should(
        "contain.text",
        "Добавьте начинку и соус"
      );
    });
  });

  describe("adding buns to the constructor", () => {
    it("buns should be added only to the top and bottom part of constructor", () => {
      const bunText = "Краторная булка N-200i";
      // dragging & dropping 1st element
      cy.get("[data-ingredient-item]")
        .contains(bunText)
        .drag("[data-constructor-items-wrapper]");

      // check top bun
      cy.get("[data-constructor-el-top]").should("contain.text", bunText);

      // check bottom bun
      cy.get("[data-constructor-el-bottom]").should("contain.text", bunText);

      // check that middle section is empty
      cy.get("[data-constructor-emptyBun-middle]").should(
        "contain.text",
        "Добавьте начинку и соус"
      );
    });
  });

  describe("adding mains and sauces to the constructor", () => {
    it("sauces and mains should be added only to the middle part of constructor", () => {
      const sauceText = "Соус Spicy-X";
      const mainText = "Плоды Фалленианского дерева";

      //sauce
      cy.get("[data-ingredient-item]")
        .contains(sauceText)
        .drag("[data-constructor-items-wrapper]");

      cy.wait(1000);

      // main
      cy.get("[data-ingredient-item]")
        .contains(mainText)
        .drag("[data-constructor-items-wrapper]");

      cy.wait(1000);

      // check top empty bun
      cy.get("[data-constructor-emptyBun-side]")
        .first()
        .should("contain.text", "Добавьте булочку");

      // check bottom empty bun
      cy.get("[data-constructor-emptyBun-side]")
        .last()
        .should("contain.text", "Добавьте булочку");

      // check burger-constructor middle section
      cy.get("[data-constructor-draggable]")
        .first()
        .should("contain.text", sauceText);

      cy.get("[data-constructor-draggable]")
        .last()
        .should("contain.text", mainText);
    });
  });

  describe("create an order", () => {
    it("should redirect to login page if user is not logged in, if yes - create oreder", () => {
      const bunText = "Краторная булка N-200i";
      const mainText = "Плоды Фалленианского дерева";
      const loaderText = "Оформляем заказ, подождите";

      // dragging & dropping 1st element
      cy.get("[data-ingredient-item]")
        .contains(bunText)
        .drag("[data-constructor-items-wrapper]");

      // dragging & dropping 2nd element
      cy.get("[data-ingredient-item]")
        .contains(mainText)
        .drag("[data-constructor-items-wrapper]");

      //click on button
      cy.get("[data-create-order-btn]").click();
      //should be redirected because user is not logged in
      cy.url().should("include", "/login");

      // loging in user
      cy.get("[data-email-input]").type("jamper1995@mail.ru");
      cy.get("[data-password-input]").type("111111");
      cy.get("[data-login-btn]").click();
      //redirect back to home page
      cy.url().should("include", "http://localhost:3000/");

      // Click on create order btn again
      cy.get("[data-create-order-btn]").click();
      // Should be a loader with the text
      cy.get("[data-loader]").should("contain.text", loaderText);
    });
  });

  describe("modal windows", () => {
    it("should open the modal window with information about the ingredient", () => {
      const bunText = "Краторная булка N-200i";

      //click on the ingredient
      cy.get("[data-ingredient-item]").contains(bunText).click();

      // modal with ingredient info should be seen
      cy.get("[data-modal]").should("contain.text", bunText);
    });

    it("should close modal when clicking on the close btn", () => {
      const bunText = "Краторная булка N-200i";

      //click on the ingredient
      cy.get("[data-ingredient-item]").contains(bunText).click();

      // modal with ingredient info should be seen
      cy.get("[data-modal]").should("contain.text", bunText);

      // click on close btn
      cy.get("[data-modal-close-btn]").click();

      // modal should be hidden
      cy.get("[data-modal]").should("not.exist");
    });

    it("should close modal when clicking on ESC btn", () => {
      const bunText = "Краторная булка N-200i";

      //click on the ingredient
      cy.get("[data-ingredient-item]").contains(bunText).click();

      // modal with ingredient info should be seen
      cy.get("[data-modal]").should("contain.text", bunText);

      cy.get("body").type("{esc}");

      // modal should be closed
      cy.get("[data-modal]").should("not.exist");
    });
  });
});
