'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hospital_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hospital_schedule.init({
    hospitalId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hospital_schedule',
  });
  return hospital_schedule;
};