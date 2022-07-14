"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class SaleOrderController {
    constructor() {
        this.router = express_1.default.Router();
        this.getSaleOrders = (req, res) => {
            res.json({ s: 1 });
        };
        this.createSaleOrders = () => { };
        this.createQuotes = () => { };
        this.createBookings = () => { };
        this.router.get('/sales-orders', this.getSaleOrders);
        this.router.post('/sales-orders', this.createSaleOrders);
        this.router.post('/sales-orders/:id/quotes', this.createQuotes);
        this.router.post('/sales-orders/:id/bookings', this.createBookings);
    }
}
exports.default = SaleOrderController;
//# sourceMappingURL=SalesOrderController.js.map
