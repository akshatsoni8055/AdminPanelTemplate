'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('users', [{
      isAdmin: 1,
      name: 'admin',
      email: 'admin@xyz.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      isAdmin: 0,
      name: "akshat soni",
      email: "akshatsoni8055@gmail.com",
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('products', [{
      name: "laptop",
      description: "Hp elitebook 8470p",
      price: 18000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "phone",
      description: "Redmi 7A",
      price: 5000,
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('orders', [{
      userId: 2,
      productId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      productId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('users', null, {});
     await queryInterface.bulkDelete('products', null, {});
     await queryInterface.bulkDelete('orders', null, {});
  }
};
