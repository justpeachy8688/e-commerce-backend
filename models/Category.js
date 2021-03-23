//REQUIRE THE MODEL AND DATA TYPES FROM SEQUELIZE
const { Model, DataTypes } = require('sequelize');

//REQUIRE SEQUELIZE
const sequelize = require('../config/connection');

//CREATE A CATEGORY MODEL
class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // METADATA
        sequelize,
        //DON'T NEED CREATED AT AND DELETED AT COLUMNS
        timestamps: false,
        //table name exactly what is specified
        freezeTableName: true,
        underscored: true,
        modelName: "category"
    }
);

//EXPORT CATEGORY
module.exports = Category;