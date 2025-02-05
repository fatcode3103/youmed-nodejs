module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn(
                "Doctor_Specialties",
                "doctorId",
                "doctorIdKey"
            ),
            queryInterface.renameColumn(
                "Doctor_Specialties",
                "specialtyId",
                "specialtyIdKey"
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn(
                "Doctor_Specialties",
                "doctorIdKey",
                "doctorId"
            ),
            queryInterface.renameColumn(
                "Doctor_Specialties",
                "specialtyIdKey",
                "specialtyId"
            ),
        ]);
    },
};
