const mongoose = require('mongoose');

let securityQuestionSchema = mongoose.Schema({
    text: {type: String},
    isDisabled: {type: Boolean, default: false}
});

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);