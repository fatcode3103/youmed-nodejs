'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic_Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clinic_Schedule.init({
    clinicId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic_Schedule',
  });
  return Clinic_Schedule;
};