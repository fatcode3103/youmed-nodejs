module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("specialties", "name", "valueVi");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("specialties", "valueVi", "name");
    },
};
