"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clinic.hasOne(models.ClinicDetail, {
                foreignKey: "clinicId",
                as: "clinicDetailData",
            });

            Clinic.hasMany(models.Clinic_Specialty, {
                foreignKey: "clinicId",
                target: "clinicId",
                as: "clinicSpecialtyData",
            });
            Clinic.hasMany(models.Booking, {
                foreignKey: "clinicId",
                as: "clinicBookingData",
            });
        }
    }
    Clinic.init(
        {
            logo: DataTypes.BLOB,
            name: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Clinic",
        }
    );
    return Clinic;
};
