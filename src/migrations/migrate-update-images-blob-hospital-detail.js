module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("hospitaldetails", "images", {
                type: Sequelize.BLOB("long"),
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("hospitaldetails", "images", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
