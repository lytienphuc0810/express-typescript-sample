"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
class Item {
    constructor(props) {
        super(props);
    }
}
const Item = sequelize.define('Item', {
    sku: sequelize_1.DataTypes.STRING,
    quantity: sequelize_1.DataTypes.INTEGER,
    gramsPerItem: sequelize_1.DataTypes.INTEGER,
    price: sequelize_1.DataTypes.FLOAT
});
//# sourceMappingURL=Item.js.map