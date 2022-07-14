"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Item = exports.SalesOrder = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
exports.sequelize = sequelize;
const SalesOrder = sequelize.define('SalesOrder', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    customer: sequelize_1.DataTypes.STRING,
    status: {
        type: sequelize_1.DataTypes
            .ENUM('RECEIVED', 'QUOTED', 'BOOKED', 'CANCELLED'),
        defaultValue: 'RECEIVED'
    }
});
exports.SalesOrder = SalesOrder;
const Booking = sequelize.define('Booking', {
    carrierPricePaid: sequelize_1.DataTypes.FLOAT,
    carrierBooked: sequelize_1.DataTypes.ENUM('UPS', 'FEDEX', 'USPS')
});
exports.Booking = Booking;
const Item = sequelize.define('Item', {
    sku: sequelize_1.DataTypes.STRING,
    quantity: sequelize_1.DataTypes.INTEGER,
    gramsPerItem: sequelize_1.DataTypes.INTEGER,
    price: sequelize_1.DataTypes.FLOAT
});
exports.Item = Item;
SalesOrder.belongsToMany(Item, { as: 'items', through: 'SalesOrderItem', onDelete: 'SET NULL' });
Item.belongsToMany(SalesOrder, { as: 'sales-orders', through: 'SalesOrderItem', onDelete: 'SET NULL' });
SalesOrder.hasOne(Booking, { as: 'booking', onDelete: 'SET NULL' });
//# sourceMappingURL=Models.js.map