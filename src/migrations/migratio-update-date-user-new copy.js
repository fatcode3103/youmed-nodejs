module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "dateOfBirth", {
                type: Sequelize.STRING,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "dateOfBirth", {
                type: Sequelize.STRING,
            }),
        ]);
    },
};
