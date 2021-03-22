const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model { }

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: {
            type: DataTypes.STRING
        }
    },
    {
        //METADATA
        sequelize,
        timestamps: false,
        //table name exactly what is specified
        freezeTableName: true,
        underscored: true,
        modelName: "category"
    }
);

module.exports = Tag;