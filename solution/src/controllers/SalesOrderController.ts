import express, { Request, Response } from 'express'
import * as _ from 'lodash'
import SalesOrderService from '../services/SalesOrderService'

class SalesOrderController {
  public router = express.Router()
  private service : SalesOrderService

  constructor () {
    this.router.get('/sales-orders', this.getSaleOrders)
    this.router.post('/sales-orders', this.createSaleOrder)
    this.router.post('/sales-orders/:id/quotes', this.createQuotes)
    this.router.post('/sales-orders/:id/bookings', this.createBookings)
    this.service = new SalesOrderService()
  }

  private serializeSaleOrders = (saleOrders : any) => {
    return _.map(saleOrders, saleOrder => {
      if (saleOrder.booking) {
        saleOrder.carrierPricePaid = saleOrder.booking.carrierPricePaid
        saleOrder.carrierBooked = saleOrder.booking.carrierBooked
      }

      saleOrder =
        _.omitBy(_.pick(saleOrder, [
          'id',
          'status',
          'customer',
          'items',
          'quotes',
          'carrierPricePaid',
          'carrierBooked'
        ]), _.isNull)

      saleOrder.items = this.serializeItems(saleOrder.items)
      saleOrder.quotes = []
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

  private serializeBookings (bookings: any) {
    return _.map(bookings, booking => {
      return _.pick(booking, [
        'carrierBooked',
        'carrierPricePaid'
      ])
    })
  }

  private getSaleOrders = async (req: Request, res: Response) => {
    const saleOrders = await this.service.findAll(req.query.status)
    res.status(200).json({ salesOrders: this.serializeSaleOrders(saleOrders) })
  }

  private createSaleOrder = async (req: Request, res: Response) => {
    try {
      const saleOrders = await this.service.create(req.body)
      return res.status(200).json(this.serializeSaleOrders(saleOrders)[0])
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err })
    }
  }

  private createQuotes = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const quotes = await this.service.getQuotes(id, req.body)
      return res.status(200).json({
        quotes
      })
    } catch (err) {
      if (err.message === 'Sales order not found') {
        return res.status(404).json({ error: err.message })
      } else if (err.message === 'Sales order is already booked') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ err })
      }
    }
  }

  private createBookings = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const booking = await this.service.createBooking(id, req.body)
      return res.status(200).json({
        ...this.serializeBookings([booking])[0]
      })
    } catch (err) {
      console.log(err)
      if (err.message === 'Invalid Sales Order' ||
       err.message === 'Unknown carrier') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ err })
      }
    }
  }
}
export default SalesOrderController
