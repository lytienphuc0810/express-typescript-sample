import express, { Request, Response } from 'express'
import SalesOrderService from '../services/SalesOrderService'

class SalesOrderController {
  public router = express.Router()
  private service : SalesOrderService
  getSaleOrders = async (req: Request, res: Response) => {
    const result = await this.service.findAll()
    res.json({ result })
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
