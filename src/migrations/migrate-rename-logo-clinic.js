module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("Clinics", "image", "logo");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("Clinics", "logo", "image");
    },
};
