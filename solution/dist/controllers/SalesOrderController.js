"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const _ = __importStar(require("lodash"));
const SalesOrderService_1 = __importDefault(require("../services/SalesOrderService"));
class SalesOrderController {
    constructor() {
        this.router = express_1.default.Router();
        this.serializeSaleOrders = (saleOrders) => {
            return _.map(saleOrders, saleOrder => {
                saleOrder = _.pick(saleOrder, [
                    'id',
                    'status',
                    'customer',
                    'items',
                    'carrierPricePaid',
                    'carrierBooked',
                    'quotes'
                ]);
                saleOrder.items = this.serializeItems(saleOrder.items);
                saleOrder.quotes = this.serializeQuotes(saleOrder.quotes);
                return saleOrder;
            });
        };
        this.getSaleOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const saleOrder = yield this.service.findAll(req.query.status);
            res.json({ saleOrder: this.serializeSaleOrders(saleOrder) });
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
    serializeItems(items) {
        return _.map(items, item => {
            return _.pick(item, [
                'sku',
                'quantity',
                'gramsPerItem',
                'price'
            ]);
        });
    }
    serializeQuotes(quotes) {
        return _.map(quotes, quote => {
            return _.pick(quote, [
                'carrier',
                'priceCents'
            ]);
        });
    }
}
exports.default = SalesOrderController;
//# sourceMappingURL=SalesOrderController.js.map