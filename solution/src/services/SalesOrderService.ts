import { Booking, Item, SalesOrder } from '../models/Models'
import * as _ from 'lodash'

class SalesOrderService {
  public findAll = async (status:any) => {
    let whereOpt = {}
    if (status) {
      whereOpt = {
        where: {
          status
        }
      }
    }

    return (await SalesOrder.findAll({
      ...whereOpt,
      include: [
        { model: Item, as: 'items' },
        { model: Booking, as: 'booking' }
      ]
    }))
  }

  async create (body: any) {
    const saleOrder = await SalesOrder.create({
      id: body.id,
      customer: body.customer
    })

    const itemsData = _.map(body.items, data => {
      return {
        sku: data.sku,
        quantity: data.quantity,
        gramsPerItem: data.gramsPerItem,
        price: data.price
      }
    })

    const items = await Item.bulkCreate(itemsData)
    // @ts-ignore
    await saleOrder.setItems(items)

    return await SalesOrder.findAll({
      where: {
        // @ts-ignore
        id: saleOrder.id
      },
      include: [
        { model: Item, as: 'items' }
      ]
    })
  }

  calculateQuote (items : typeof Item[], carrier: string) {
    switch (carrier) {
      case 'UPS':
        // @ts-ignore
        return items.reduce((acc, item) => acc + item.gramsPerItem * 0.05, 800)
      case 'USPS':
        // @ts-ignore
        return items.reduce((acc, item) => acc + item.gramsPerItem * 0.02, 1050)
      case 'FEDEX':
        // @ts-ignore
        return items.reduce((acc, item) => acc + item.gramsPerItem * 0.03, 1000)
      default:
        throw new Error('Unknown carrier')
    }
  }

  async getQuotes (id: string, body: any) {
    const carriers = body.carriers

    const saleOrders = await SalesOrder.findAll({
      where: {
        id
      },
      include: [
        { model: Item, as: 'items' }
      ]
    })

    if (saleOrders.length === 0) {
      throw Error('Sales order not found')
    }

    // @ts-ignore
    if (saleOrders[0].status === 'BOOKED') {
      throw Error('Sales order is already booked')
    }

    return _.map(carriers, carrier => {
      return {
        carrier,
        // @ts-ignore
        priceCents: this.calculateQuote(saleOrders[0].items, carrier)
      }
    })
  }

  async createBooking (id: string, body: any) {
    const carrier = body.carrier
    const saleOrders = await SalesOrder.findAll({
      where: {
        id
      },
      include: [
        { model: Item, as: 'items' }
      ]
    })

    if (saleOrders.length === 0) {
      throw Error('Invalid Sales Order')
    }

    // @ts-ignore
    const carrierPricePaid = this.calculateQuote(saleOrders[0].items, carrier)
    console.error(carrierPricePaid)
    const booking = await Booking.create({
      carrierPricePaid,
      carrierBooked: carrier
    })

    // @ts-ignore
    await saleOrders[0].setBooking(booking)
    await SalesOrder.update({ status: 'BOOKED' }, {
      where: {
        // @ts-ignore
        id: saleOrders[0].id
      }
    })

    return booking
  }
}
export default SalesOrderService
