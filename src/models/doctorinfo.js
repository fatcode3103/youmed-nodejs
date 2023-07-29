"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DoctorInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DoctorInfo.belongsTo(models.User, {
                foreignKey: "doctorId",
                target: "id",
                as: "detailInfoData",
            });
        }
    }
    DoctorInfo.init(
        {
            doctorId: DataTypes.INTEGER,
            workPlace: DataTypes.STRING,
            note: DataTypes.TEXT,
            introduction: DataTypes.TEXT,
            traningProcess: DataTypes.STRING,
            experience: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "DoctorInfo",
        }
    );
    return DoctorInfo;
};
