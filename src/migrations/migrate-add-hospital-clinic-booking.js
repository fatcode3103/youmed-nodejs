module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("Bookings", "hospitalId", {
                type: Sequelize.INTEGER,
            }),
            queryInterface.addColumn("Bookings", "clinicId", {
                type: Sequelize.INTEGER,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("Bookings", "hospitalId"),
            queryInterface.removeColumn("Bookings", "clinicId"),
        ]);
    },
};
