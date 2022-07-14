import { Item, SalesOrder, sequelize } from './models/Models'

(async () => {
  await sequelize.sync({ force: true })

  SalesOrder.destroy({ truncate: true })
  const sale1 = await SalesOrder.create({
    id: '1',
    customer: 'John Doe'
  })
  const item1 = await Item.create({
    sku: 'BRD-1234',
    quantity: 2,
    gramsPerItem: 500,
    price: 1.5
  })
  const item2 = await Item.create({
    sku: 'MLK-2L',
    quantity: 1,
    gramsPerItem: 2000,
    price: 2.5
  })
  // @ts-ignore
  sale1.setItems([item1, item2])

  const sale2 = await SalesOrder.create({
    id: '2',
    customer: 'Jane Doe'
  })
  // @ts-ignore
  sale2.setItems([item2])

  const sale3 = await SalesOrder.create({
    id: '3',
    customer: 'Jane Doe-nught'
  })
  // @ts-ignore
  sale3.setItems([item1])
})()
