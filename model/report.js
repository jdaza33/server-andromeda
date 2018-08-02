import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const Schema = mongoose.Schema


const REPORT = new Schema({
    id_client: {
        type: String,
        required: true
    },
    nro_support: {
        type: String,
        required: true,
        unique: true
    },
    assigned:{
        type: String,
        default: ''
    },
    ref: {
        type: String,
        required: true
    }
});

REPORT.plugin(timestamp);

export default mongoose.model('report', REPORT);