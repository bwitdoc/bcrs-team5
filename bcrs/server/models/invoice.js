/*=========================
Name: Brittany Dockter
Date: April 20, 2020
Assignment: invoice.js
Description: create an invoiceSchema for orders
==========================*/
const lineItemSchema = require('./lineItem.js');
const mongoose = require('mongoose');

// invoice schema
let invoiceSchema = mongoose.Schema({
    lineItems: [lineItemSchema],
    partsAmount: {type: Number},
    laborAmount: {type: Number},
    lineItemTotal: {type: Number},
    total: {type: Number},
    username: {type: String},
    orderDate: {type: Date}
});

// export for public use
module.exports = mongoose.model('Invoice', invoiceSchema);