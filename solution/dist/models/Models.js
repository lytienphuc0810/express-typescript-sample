"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = exports.Item = exports.SalesOrder = exports.sequelize = void 0;
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
    },
    carrierPricePaid: sequelize_1.DataTypes.FLOAT,
    carrierBooked: sequelize_1.DataTypes.ENUM('UPS', 'FEDEX', 'USPS')
});
exports.SalesOrder = SalesOrder;
const Item = sequelize.define('Item', {
    sku: sequelize_1.DataTypes.STRING,
    quantity: sequelize_1.DataTypes.INTEGER,
    gramsPerItem: sequelize_1.DataTypes.INTEGER,
    price: sequelize_1.DataTypes.FLOAT
});
exports.Item = Item;
const Quote = sequelize.define('Quote', {
    carrier: sequelize_1.DataTypes.ENUM('UPS', 'FEDEX', 'USPS'),
    priceCents: sequelize_1.DataTypes.FLOAT
});
exports.Quote = Quote;
const Movie = sequelize.define('Movie', { name: sequelize_1.DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: sequelize_1.DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
SalesOrder.belongsToMany(Item, { through: 'SalesOrderItem', onDelete: 'SET NULL' });
Item.belongsToMany(SalesOrder, { through: 'SalesOrderItem', onDelete: 'SET NULL' });
SalesOrder.hasMany(Quote, { as: 'quotes', onDelete: 'CASCADE' });
//# sourceMappingURL=Models.js.map