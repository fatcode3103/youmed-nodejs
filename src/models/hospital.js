"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class hospital extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            hospital.hasOne(models.HospitalDetail, {
                foreignKey: "hospitalId",
                as: "hospitalDetailData",
            });

            hospital.hasMany(models.Hospital_Specialty, {
                foreignKey: "hospitalId",
                as: "hospitalSpecialtyData",
            });
            hospital.hasMany(models.Booking, {
                foreignKey: "hospitalId",
                as: "hospitalBookingData",
            });
        }
    }
    hospital.init(
        {
            name: DataTypes.STRING,
            logo: DataTypes.BLOB,
            coverImg: DataTypes.BLOB,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "hospital",
        }
    );
    return hospital;
};
