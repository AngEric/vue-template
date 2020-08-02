'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        slug: 'view-user-page',
        status: 1,
      },
      {
        slug: 'add-new-user',
        status: 1,
      },
      {
        slug: 'update-user',
        status: 1,
      },
      {
        slug: 'view-role-page',
        status: 1,
      },
      {
        slug: 'create-new-role',
        status: 1,
      },
      {
        slug: 'update-role',
        status: 1,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
