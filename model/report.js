import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const Schema = mongoose.Schema


const REPORT = new Schema({
    nro: {
        type: String,
        required: true,
        unique: true
    },
    nro_support: {
        type: String,
        required: true,
        unique: true
    },
    total_hours: {
        type: String,
        required: true
    },
    total_service: {
        type: String,
        required: true
    },
    invoiced: {
        type: String,
        default: 'N'
    },
    ref: {
        type: String,
        required: true
    }
});

REPORT.plugin(timestamp);

export default mongoose.model('report', REPORT);