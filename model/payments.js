import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema


const PAYMENTS = new Schema({

    nro: {
        type: String,
        required: true
    },
    id_bill: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: ''
    }
});

PAYMENTS.plugin(timestamp);
//BILL.plugin(AutoIncrement, { inc_field: 'nro' });

export default mongoose.model('payments', PAYMENTS);