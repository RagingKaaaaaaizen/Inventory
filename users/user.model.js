const { DataTypes } = require('sequelize');
module.exports = model;

function model(sequelize) {
    const attributes = {
        part_name: { type: DataTypes.STRING, allowNull: false },
        category_id: { type: DataTypes.INTEGER, allowNull: false },
        brand_id: { type: DataTypes.INTEGER, allowNull: false },
        model_number: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        stock_quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    };

    const options = {
        timestamps: true // This will add createdAt and updatedAt fields
    };

    return sequelize.define('User', attributes, options);
}
