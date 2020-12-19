"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const categorias = await queryInterface.sequelize.query(
      `SELECT id from Categoria;`
    );

    const categoriaRows = categorias[0];
    console.log(categoriaRows);
    console.log(categoriaRows[0].id);
    console.log(categoriaRows[1].id);
    await queryInterface.bulkInsert("Articulos", [
      {
        codigo: "Articulo 1",
        nombre: "Nombre Articulo 1",
        descripcion: "...",
        estado: 1,
        categoriaId: categoriaRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        codigo: "Articulo 2",
        nombre: "Nombre Articulo 2",
        descripcion: "...",
        estado: 1,
        categoriaId: categoriaRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        codigo: "Articulo 3",
        nombre: "Nombre Articulo 3",
        descripcion: "...",
        estado: 1,
        categoriaId: categoriaRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        codigo: "Articulo 4",
        nombre: "Nombre Articulo 4",
        descripcion: "...",
        estado: 1,
        categoriaId: categoriaRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Articulos", null, {});
    await queryInterface.bulkDelete("Categoria", null, {});
  },
};
