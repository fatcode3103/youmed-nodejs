module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "dateOfBirth", {
                type: Sequelize.INTEGER,
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
