module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn(
                "doctor_specialties",
                "doctorId",
                "doctorIdKey"
            ),
            queryInterface.renameColumn(
                "doctor_specialties",
                "specialtyId",
                "specialtyIdKey"
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn(
                "doctor_specialties",
                "doctorIdKey",
                "doctorId"
            ),
            queryInterface.renameColumn(
                "doctor_specialties",
                "specialtyIdKey",
                "specialtyId"
            ),
        ]);
    },
};
