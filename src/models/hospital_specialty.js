"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Hospital_Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Hospital_Specialty.belongsTo(models.Specialty, {
                foreignKey: "specialtyId",
                as: "specialtyData",
            });

            Hospital_Specialty.belongsTo(models.hospital, {
                foreignKey: "hospitalId",
                as: "hospitalSpecialtyData",
            });
        }
    }
    Hospital_Specialty.init(
        {
            hospitalId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Hospital_Specialty",
        }
    );
    return Hospital_Specialty;
};
