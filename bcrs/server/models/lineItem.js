/*=========================
Name: Brittany Dockter
Date: March 31, 2020
Assignment: lineItem.js
Description: create a lineItemSchema for a service
==========================*/

const mongoose = require('mongoose');

// line item schema
let lineItemSchema = mongoose.Schema({
    title: {type: String},
    price: {type: Number}
});

// export for public use
module.exports = mongoose.model('lineItem', lineItemSchema);