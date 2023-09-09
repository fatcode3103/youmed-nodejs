"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ClinicDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClinicDetail.belongsTo(models.Clinic, {
                foreignKey: "clinicId",
                as: "clinicDetailData",
            });
        }
    }
    ClinicDetail.init(
        {
            clinicId: DataTypes.INTEGER,
            addressMap: DataTypes.STRING,
            images: DataTypes.TEXT("long"),
            introduction: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "ClinicDetail",
        }
    );
    return ClinicDetail;
};
