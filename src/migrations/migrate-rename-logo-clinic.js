module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("clinics", "image", "logo");
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("clinics", "logo", "image");
    },
};
