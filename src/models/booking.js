"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init(
        {
            status: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            hospitalId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            date: DataTypes.STRING,
            timeType: DataTypes.STRING,
            note: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};

// 1692032400000;
