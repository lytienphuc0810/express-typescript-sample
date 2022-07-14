"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
const SalesOrder = sequelize.define('SalesOrder', {
    id: sequelize_1.DataTypes.INTEGER,
    customer: sequelize_1.DataTypes.STRING,
    // items:
});
//# sourceMappingURL=SalesOrder.js.map