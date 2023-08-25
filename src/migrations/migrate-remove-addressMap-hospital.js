"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("hospitals", "addressMap");
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("hospitals");
    },
};
