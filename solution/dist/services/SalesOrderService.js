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
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../models/Models");
const _ = __importStar(require("lodash"));
class SalesOrderService {
    constructor() {
        this.findAll = (status) => __awaiter(this, void 0, void 0, function* () {
            let whereOpt = {};
            if (status) {
                whereOpt = {
                    where: {
                        status
                    }
                };
            }
            return (yield Models_1.SalesOrder.findAll(Object.assign(Object.assign({}, whereOpt), { include: [
                    { model: Models_1.Item, as: 'items' },
                    { model: Models_1.Booking, as: 'booking' }
                ] })));
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleOrder = yield Models_1.SalesOrder.create({
                id: body.id,
                customer: body.customer
            });
            const itemsData = _.map(body.items, data => {
                return {
                    sku: data.sku,
                    quantity: data.quantity,
                    gramsPerItem: data.gramsPerItem,
                    price: data.price
                };
            });
            const items = yield Models_1.Item.bulkCreate(itemsData);
            // @ts-ignore
            yield saleOrder.setItems(items);
            return yield Models_1.SalesOrder.findAll({
                where: {
                    // @ts-ignore
                    id: saleOrder.id
                },
                include: [
                    { model: Models_1.Item, as: 'items' }
                ]
            });
        });
    }
    calculateQuote(items, carrier) {
        switch (carrier) {
            case 'UPS':
                // @ts-ignore
                return items.reduce((acc, item) => acc + item.gramsPerItem * 0.05, 800);
            case 'USPS':
                // @ts-ignore
                return items.reduce((acc, item) => acc + item.gramsPerItem * 0.02, 1050);
            case 'FEDEX':
                // @ts-ignore
                return items.reduce((acc, item) => acc + item.gramsPerItem * 0.03, 1000);
            default:
                throw new Error('Unknown carrier');
        }
    }
    getQuotes(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const carriers = body.carriers;
            const saleOrders = yield Models_1.SalesOrder.findAll({
                where: {
                    id
                },
                include: [
                    { model: Models_1.Item, as: 'items' }
                ]
            });
            if (saleOrders.length === 0) {
                throw Error('Sales order not found');
            }
            // @ts-ignore
            if (saleOrders[0].status === 'BOOKED') {
                throw Error('Sales order is already booked');
            }
            return _.map(carriers, carrier => {
                return {
                    carrier,
                    // @ts-ignore
                    priceCents: this.calculateQuote(saleOrders[0].items, carrier)
                };
            });
        });
    }
    createBooking(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const carrier = body.carrier;
            const saleOrders = yield Models_1.SalesOrder.findAll({
                where: {
                    id
                },
                include: [
                    { model: Models_1.Item, as: 'items' }
                ]
            });
            if (saleOrders.length === 0) {
                throw Error('Invalid Sales Order');
            }
            // @ts-ignore
            const carrierPricePaid = this.calculateQuote(saleOrders[0].items, carrier);
            console.error(carrierPricePaid);
            const booking = yield Models_1.Booking.create({
                carrierPricePaid,
                carrierBooked: carrier
            });
            // @ts-ignore
            yield saleOrders[0].setBooking(booking);
            yield Models_1.SalesOrder.update({ status: 'BOOKED' }, {
                where: {
                    // @ts-ignore
                    id: saleOrders[0].id
                }
            });
            return booking;
        });
    }
}
exports.default = SalesOrderService;
//# sourceMappingURL=SalesOrderService.js.map