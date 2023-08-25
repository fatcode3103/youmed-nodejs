module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("hospitaldetails", "introduction", {
                type: Sequelize.TEXT("long"),
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("hospitaldetails", "introduction", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
