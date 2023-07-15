"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        // email: DataTypes.STRING,
        //     firstName: DataTypes.STRING,
        //     lastName: DataTypes.STRING,
        //     address: DataTypes.STRING,
        //     password: DataTypes.STRING,
        //     phoneNumber: DataTypes.STRING,
        //     gender: DataTypes.STRING,
        //     positionId: DataTypes.STRING,
        //     roleId: DataTypes.STRING,
        //     image: DataTypes.TEXT,
        return queryInterface.bulkInsert("Users", [
            {
                email: "admin@gmail.com",
                password: "1112003",
                firstName: "Dat",
                lastName: "Van",
                address: "Hà Nội",
                phoneNumber: "0976089462",
                gender: "M",
                positionId: "P1",
                roleId: "R1",
                image: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
