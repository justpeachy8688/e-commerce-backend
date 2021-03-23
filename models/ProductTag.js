const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        }
    },
    {
        //METADATA
        sequelize,
        timestamps: false,
        //table name exactly what is specified
        freezeTableName: true,
        underscored: true,
        modelName: "productTag"
    }
);

module.exports = ProductTag;