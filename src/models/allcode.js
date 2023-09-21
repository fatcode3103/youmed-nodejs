"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AllCode.hasMany(models.User, {
                foreignKey: "roleId",
                as: "roleData",
            });
            AllCode.hasMany(models.User, {
                foreignKey: "positionId",
                as: "positionData",
            });
            AllCode.hasMany(models.User, {
                foreignKey: "gender",
                as: "genderData",
            });
            AllCode.hasMany(models.Booking, {
                foreignKey: "status",
                as: "statusBookingData",
            });
            AllCode.hasMany(models.Booking, {
                foreignKey: "timeType",
                as: "timeTypeBookingData",
            });
        }
    }
    AllCode.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueVi: DataTypes.STRING,
            valueEn: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "AllCode",
        }
    );
    return AllCode;
};
