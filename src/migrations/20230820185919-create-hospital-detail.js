"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("HospitalDetails", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            hospitalId: {
                type: Sequelize.INTEGER,
            },
            slogan: {
                type: Sequelize.STRING,
            },
            linkweb: {
                type: Sequelize.STRING,
            },
            images: {
                type: Sequelize.STRING,
            },
            addressMap: {
                type: Sequelize.STRING,
            },
            switchboard: {
                type: Sequelize.STRING,
            },
            servicePrice: {
                type: Sequelize.STRING,
            },
            billPrice: {
                type: Sequelize.STRING,
            },
            introduction: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("HospitalDetails");
    },
};
