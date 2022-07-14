"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SalesOrderService_1 = __importDefault(require("../services/SalesOrderService"));
class SalesOrderController {
    constructor() {
        this.router = express_1.default.Router();
        this.getSaleOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.findAll();
            res.json({ result });
        });
        this.createSaleOrders = () => { };
        this.createQuotes = () => { };
        this.createBookings = () => { };
        this.router.get('/sales-orders', this.getSaleOrders);
        this.router.post('/sales-orders', this.createSaleOrders);
        this.router.post('/sales-orders/:id/quotes', this.createQuotes);
        this.router.post('/sales-orders/:id/bookings', this.createBookings);
        this.service = new SalesOrderService_1.default();
    }
}
exports.default = SalesOrderController;
//# sourceMappingURL=SalesOrderController.js.map