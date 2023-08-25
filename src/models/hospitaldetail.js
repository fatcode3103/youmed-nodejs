"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HospitalDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            HospitalDetail.belongsTo(models.hospital, {
                foreignKey: "hospitalId",
                as: "hospitalDetailData",
            });
        }
    }
    HospitalDetail.init(
        {
            hospitalId: DataTypes.INTEGER,
            slogan: DataTypes.STRING,
            linkweb: DataTypes.STRING,
            images: DataTypes.TEXT("long"),
            addressMap: DataTypes.STRING,
            switchboard: DataTypes.STRING,
            servicePrice: DataTypes.STRING,
            billPrice: DataTypes.STRING,
            introduction: DataTypes.TEXT("long"),
        },
        {
            sequelize,
            modelName: "HospitalDetail",
        }
    );
    return HospitalDetail;
};
