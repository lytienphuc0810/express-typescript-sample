import { DataTypes, Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})
const SalesOrder = sequelize.define('SalesOrder', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  customer: DataTypes.STRING,
  status: {
    type: DataTypes
      .ENUM('RECEIVED', 'QUOTED', 'BOOKED', 'CANCELLED'),
    defaultValue: 'RECEIVED'
  }
})

const Booking = sequelize.define('Booking', {
  carrierPricePaid: DataTypes.FLOAT,
  carrierBooked: DataTypes.ENUM('UPS', 'FEDEX', 'USPS')
})

const Item = sequelize.define('Item', {
  sku: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  gramsPerItem: DataTypes.INTEGER,
  price: DataTypes.FLOAT
})

SalesOrder.belongsToMany(Item, { as: 'items', through: 'SalesOrderItem', onDelete: 'SET NULL' })
Item.belongsToMany(SalesOrder, { as: 'sales-orders', through: 'SalesOrderItem', onDelete: 'SET NULL' })
SalesOrder.hasOne(Booking, { as: 'booking', onDelete: 'SET NULL' })

export {
  sequelize,
  SalesOrder,
  Item,
  Booking
}
