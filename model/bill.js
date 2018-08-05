import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema


const BILL = new Schema({

    nro_control: {
        type: String,
        default: ''
    },
    nro_report: {
        type: String,
        required: true,
        unique: true
    },
    id_client: {
        type: String,
        required: true
    },
    details: [{
        cant: {
            type: String,
            default: 'xx'
        },
        description: {
            type: String,
            require: true
        },
        unit_price: {
            type: String,
            default: '0.00'
        },
        total: {
            type: String, 
            require: true
        }
    }],
    sub_total: {
        type: String,
        required: true
    },
    iva: {
        type: String,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    }
});

BILL.plugin(timestamp);
BILL.plugin(AutoIncrement, { inc_field: 'nro' });

export default mongoose.model('bill', BILL);