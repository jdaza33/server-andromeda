import mongoose from 'mongoose'
const Schema = mongoose.Schema

const INFO_PERSONAL = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        default: ''
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    birthdate: Date,
    address: {
        country: {
            type: String,
            default: 'Venezuela'
        },
        state: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    },
    photo: {
        type: String,
        default: ''
    }
});

export default mongoose.model('infopersonal', INFO_PERSONAL);

