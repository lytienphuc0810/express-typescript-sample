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
  },
  carrierPricePaid: DataTypes.FLOAT,
  carrierBooked: DataTypes.ENUM('UPS', 'FEDEX', 'USPS')
})

const Item = sequelize.define('Item', {
  sku: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  gramsPerItem: DataTypes.INTEGER,
  price: DataTypes.FLOAT
})

const Quote = sequelize.define('Quote', {
  carrier: DataTypes.ENUM('UPS', 'FEDEX', 'USPS'),
  priceCents: DataTypes.FLOAT
})

const Movie = sequelize.define('Movie', { name: DataTypes.STRING })
const Actor = sequelize.define('Actor', { name: DataTypes.STRING })
Movie.belongsToMany(Actor, { through: 'ActorMovies' })
Actor.belongsToMany(Movie, { through: 'ActorMovies' })

SalesOrder.belongsToMany(Item, { as: 'items', through: 'SalesOrderItem', onDelete: 'SET NULL' })
Item.belongsToMany(SalesOrder, { as: 'sales-orders', through: 'SalesOrderItem', onDelete: 'SET NULL' })
SalesOrder.hasMany(Quote, { as: 'quotes', onDelete: 'CASCADE' })

export {
  sequelize,
  SalesOrder,
  Item,
  Quote
}
