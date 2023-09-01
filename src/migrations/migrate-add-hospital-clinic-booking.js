module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("bookings", "hospitalId", {
                type: Sequelize.INTEGER,
            }),
            queryInterface.addColumn("bookings", "clinicId", {
                type: Sequelize.INTEGER,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("bookings", "hospitalId"),
            queryInterface.removeColumn("bookings", "clinicId"),
        ]);
    },
};
