'use strict';
const faker = require('faker')

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
   let data = []
   for (let i=0; i<=100; i++) {
     data.push({
      name: faker.name.title(),
      description: faker.random.words(5),
      price: Math.round(Math.random()*10000),
      createdAt: new Date(),
      updatedAt: new Date()
     })
   }

   await queryInterface.bulkInsert('products', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('products', null, {})
  }
};
