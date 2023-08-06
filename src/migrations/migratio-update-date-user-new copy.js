module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("users", "dateOfBirth", {
                type: Sequelize.STRING,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("user", "dateOfBirth", {
                type: Sequelize.STRING,
            }),
        ]);
    },
};
