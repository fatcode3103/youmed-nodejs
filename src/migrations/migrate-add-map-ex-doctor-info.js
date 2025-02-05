module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("DoctorInfos", "addressMap", {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn("DoctorInfos", "yearExperience", {
                type: Sequelize.STRING,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("DoctorInfos", "addressMap"),
            queryInterface.removeColumn("DoctorInfos", "yearExperience"),
        ]);
    },
};
