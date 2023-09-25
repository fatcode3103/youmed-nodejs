"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clinic_Specialty.belongsTo(models.Clinic, {
                foreignKey: "clinicId",
                target: "id",
                as: "clinicSpecialtyData",
            });

            Clinic_Specialty.belongsTo(models.Specialty, {
                foreignKey: "specialtyId",
                as: "clinicSpecialtyDetailData",
            });
        }
    }
    Clinic_Specialty.init(
        {
            clinicId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Clinic_Specialty",
        }
    );
    return Clinic_Specialty;
};
