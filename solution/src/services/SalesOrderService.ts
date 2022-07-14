import { SalesOrder, Item, Quote } from '../models/Models'

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
        { model: Quote, as: 'quotes' }
      ]
    }))
  }
}
export default SalesOrderService
