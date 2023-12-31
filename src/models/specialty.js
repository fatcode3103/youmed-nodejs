"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Specialty.hasMany(models.Doctor_Specialty, {
                foreignKey: "specialtyIdKey",
                as: "specialtyData",
            });

            Specialty.hasMany(models.Clinic_Specialty, {
                foreignKey: "specialtyId",
                as: "clinicSpecialtyDetailData",
            });
        }
    }
    Specialty.init(
        {
            image: DataTypes.BLOB,
            valueVi: DataTypes.STRING,
            valueEn: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Specialty",
        }
    );
    return Specialty;
};
