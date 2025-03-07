const { DataTypes } = require('sequelize');
module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
        sku: { type: DataTypes.STRING, allowNull: false, unique: true },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
        
    };

    const options = {
        timestamps: true // This will add createdAt and updatedAt fields
    };

    return sequelize.define('Product', attributes, options);
} 