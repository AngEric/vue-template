'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        slug: 'all',
        section: '',
        status: 1,
      },
      {
        slug: 'view-user-page',
        section: 'User',
        status: 1,
      },
      {
        slug: 'add-new-user',
        section: 'User',
        status: 1,
      },
      {
        slug: 'update-user',
        section: 'User',
        status: 1,
      },
      {
        slug: 'view-role-page',
        section: 'Role Setting',
        status: 1,
      },
      {
        slug: 'create-new-role',
        section: 'Role Setting',
        status: 1,
      },
      {
        slug: 'update-role',
        section: 'Role Setting',
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
