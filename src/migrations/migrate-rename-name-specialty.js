module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("Specialties", "name", "valueVi");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("Specialties", "valueVi", "name");
    },
};
