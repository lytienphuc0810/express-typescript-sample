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
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("./models/Models");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Models_1.sequelize.sync({ force: true });
    Models_1.SalesOrder.destroy({ truncate: true });
    const sale1 = yield Models_1.SalesOrder.create({
        id: '1',
        customer: 'John Doe'
    });
    const item1 = yield Models_1.Item.create({
        sku: 'BRD-1234',
        quantity: 2,
        gramsPerItem: 500,
        price: 1.5
    });
    const item2 = yield Models_1.Item.create({
        sku: 'MLK-2L',
        quantity: 1,
        gramsPerItem: 2000,
        price: 2.5
    });
    // @ts-ignore
    sale1.setItems([item1, item2]);
    const sale2 = yield Models_1.SalesOrder.create({
        id: '2',
        customer: 'Jane Doe'
    });
    // @ts-ignore
    sale2.setItems([item2]);
    const sale3 = yield Models_1.SalesOrder.create({
        id: '3',
        customer: 'Jane Doe-nught'
    });
    // @ts-ignore
    sale3.setItems([item1]);
}))();
//# sourceMappingURL=seed.js.map