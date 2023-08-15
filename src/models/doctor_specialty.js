"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Doctor_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_Specialty.belongsTo(models.Specialty, {
                foreignKey: "specialtyIdKey",
                target: "id",
                as: "specialtyData",
            });

            Doctor_Specialty.belongsTo(models.User, {
                foreignKey: "doctorIdKey",
                target: "id",
                as: "doctorSpecialtyData",
            });
        }
    }
    Doctor_Specialty.init(
        {
            doctorIdKey: DataTypes.INTEGER,
            specialtyIdKey: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Doctor_Specialty",
        }
    );
    return Doctor_Specialty;
};
