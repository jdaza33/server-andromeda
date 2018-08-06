import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const AutoIncrement = require('mongoose-sequence')(mongoose);
let Float = require('mongoose-float').loadType(mongoose);
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
            default: '1'
        },
        description: {
            type: String,
            require: true
        },
        unit_price: {
            type: String,
            default: '0'
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
    status: {
        type: String,
        default: 'N'
    },
    ref: {
        type: String,
        required: true
    }
});

BILL.plugin(timestamp);
BILL.plugin(AutoIncrement, { inc_field: 'nro' });

export default mongoose.model('bill', BILL);