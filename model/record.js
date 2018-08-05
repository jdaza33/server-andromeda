import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RECORD = new Schema({
    nro_support: {
        type: String,
        required: true,
        unique: true
    },
    activities: [{
        date: {
            type: String,
            required: true
        },
        nro_activity:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        details: {
            type: String
        },
        description: {
            type: String
        },
        hours_service: {
            type: String,
            required: true
        }
    }]
});

export default mongoose.model('record', RECORD);

