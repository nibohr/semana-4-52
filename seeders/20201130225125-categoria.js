"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categoria", [
      {
        nombre: "Categoria_test",
        descripcion: "lorem limsus test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {nombre: "Test_categoria",
      descripcion: "test limsus lorem",
      createdAt: new Date(),
      updatedAt: new Date(),},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categoria", null, {});
  },
};
