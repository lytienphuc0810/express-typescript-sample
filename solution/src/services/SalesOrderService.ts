import { SalesOrder, Item, Quote } from '../models/Models'

class SalesOrderService {
  public findAll = async () => {
    return await SalesOrder.findAll({
      include: [
        { model: Item, as: 'items' },
        { model: Quote, as: 'quotes' }
      ]
    })
  }
}
export default SalesOrderService
