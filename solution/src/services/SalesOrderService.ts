import { SalesOrder } from '../models/Models'

class SalesOrderService {
  public findAll = async () => {
    return await SalesOrder.findAll()
  }
}
export default SalesOrderService
