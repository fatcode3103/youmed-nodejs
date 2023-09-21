"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.AllCode, {
                foreignKey: "roleId",
                targetKey: "keyMap",
                as: "roleData",
            });
            User.belongsTo(models.AllCode, {
                foreignKey: "positionId",
                targetKey: "keyMap",
                as: "positionData",
            });
            User.belongsTo(models.AllCode, {
                foreignKey: "gender",
                targetKey: "keyMap",
                as: "genderData",
            });
            User.hasMany(models.DoctorInfo, {
                foreignKey: "doctorId",
                as: "detailInfoData",
            });
            User.hasMany(models.Doctor_Specialty, {
                foreignKey: "doctorIdKey",
                as: "doctorSpecialtyData",
            });
            User.hasMany(models.Booking, {
                foreignKey: "patientId",
                as: "patientBookingData",
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            dateOfBirth: DataTypes.STRING,
            password: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            positionId: DataTypes.STRING,
            roleId: DataTypes.STRING,
            image: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
