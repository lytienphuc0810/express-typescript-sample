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
                if (saleOrder.booking) {
                    saleOrder.carrierPricePaid = saleOrder.booking.carrierPricePaid;
                    saleOrder.carrierBooked = saleOrder.booking.carrierBooked;
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
                    ]), _.isNull);
                saleOrder.items = this.serializeItems(saleOrder.items);
                saleOrder.quotes = [];
                return saleOrder;
            });
        };
        this.getSaleOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const saleOrders = yield this.service.findAll(req.query.status);
            res.status(200).json({ salesOrders: this.serializeSaleOrders(saleOrders) });
        });
        this.createSaleOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const saleOrders = yield this.service.create(req.body);
                return res.status(200).json(this.serializeSaleOrders(saleOrders)[0]);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        });
        this.createQuotes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const quotes = yield this.service.getQuotes(id, req.body);
                return res.status(200).json({
                    quotes
                });
            }
            catch (err) {
                if (err.message === 'Sales order not found') {
                    return res.status(404).json({ error: err.message });
                }
                else if (err.message === 'Sales order is already booked') {
                    return res.status(400).json({ error: err.message });
                }
                else {
                    return res.status(500).json({ err });
                }
            }
        });
        this.createBookings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const booking = yield this.service.createBooking(id, req.body);
                return res.status(200).json(Object.assign({}, this.serializeBookings([booking])[0]));
            }
            catch (err) {
                console.log(err);
                if (err.message === 'Invalid Sales Order' ||
                    err.message === 'Unknown carrier') {
                    return res.status(400).json({ error: err.message });
                }
                else {
                    return res.status(500).json({ err });
                }
            }
        });
        this.router.get('/sales-orders', this.getSaleOrders);
        this.router.post('/sales-orders', this.createSaleOrder);
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
    serializeBookings(bookings) {
        return _.map(bookings, booking => {
            return _.pick(booking, [
                'carrierBooked',
                'carrierPricePaid'
            ]);
        });
    }
}
exports.default = SalesOrderController;
//# sourceMappingURL=SalesOrderController.js.map