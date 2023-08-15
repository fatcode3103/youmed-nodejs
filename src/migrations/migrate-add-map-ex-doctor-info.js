module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("doctorinfos", "addressMap", {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn("doctorinfos", "yearExperience", {
                type: Sequelize.STRING,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("doctorinfos", "addressMap"),
            queryInterface.removeColumn("doctorinfos", "yearExperience"),
        ]);
    },
};
