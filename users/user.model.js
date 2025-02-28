const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        part_Name: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.TEXT, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        stock_quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {
        timestamps: true, // Adds createdAt and updatedAt fields
    };

    return sequelize.define('Part', attributes, options);
}

module.exports = model;
