module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("HospitalDetails", "introduction", {
                type: Sequelize.TEXT("long"),
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("HospitalDetails", "introduction", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
