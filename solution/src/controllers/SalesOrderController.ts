import express, { Request, Response } from 'express'
import * as _ from 'lodash'
import SalesOrderService from '../services/SalesOrderService'

class SalesOrderController {
  public router = express.Router()
  private service : SalesOrderService
  private serializeSaleOrders = (saleOrders : any) => {
    return _.map(saleOrders, saleOrder => {
      saleOrder = _.pick(saleOrder, [
        'id',
        'status',
        'customer',
        'items',
        'carrierPricePaid',
        'carrierBooked',
        'quotes'
      ])

      saleOrder.items = this.serializeItems(saleOrder.items)
      saleOrder.quotes = this.serializeQuotes(saleOrder.quotes)

      return saleOrder
    })
  }

  private serializeItems (items: any) {
    return _.map(items, item => {
      return _.pick(item, [
        'sku',
        'quantity',
        'gramsPerItem',
        'price'
      ])
    })
  }

  private serializeQuotes (quotes: any) {
    return _.map(quotes, quote => {
      return _.pick(quote, [
        'carrier',
        'priceCents'
      ])
    })
  }

  private getSaleOrders = async (req: Request, res: Response) => {
    const saleOrder = await this.service.findAll(req.query.status)
    res.json({ saleOrder: this.serializeSaleOrders(saleOrder) })
  }

  private createSaleOrders = () => {}
  private createQuotes = () => {}
  private createBookings = () => {}

  constructor () {
    this.router.get('/sales-orders', this.getSaleOrders)
    this.router.post('/sales-orders', this.createSaleOrders)
    this.router.post('/sales-orders/:id/quotes', this.createQuotes)
    this.router.post('/sales-orders/:id/bookings', this.createBookings)
    this.service = new SalesOrderService()
  }
}
export default SalesOrderController
