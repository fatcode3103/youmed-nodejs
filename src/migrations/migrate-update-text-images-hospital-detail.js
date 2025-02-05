module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("HospitalDetails", "images", {
                type: Sequelize.TEXT("long"),
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("HospitalDetails", "images", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
