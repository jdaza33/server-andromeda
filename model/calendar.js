import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema


const CALENDAR = new Schema({
    nro: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    invited:{
        type: String
    },
    host: {
        type: String,
        required: true
    }
});

CALENDAR.plugin(timestamp);

export default mongoose.model('calendar', CALENDAR);