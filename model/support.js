import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
const Schema = mongoose.Schema


const SUPPORT = new Schema({
    id_client: {
        type: String,
        required: true
    },
    nro: { //Numero de solicitud
        type: String,
        required: true,
        unique: true
    },
    issue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: ''
    },
    assigned:{
        type: String,
        default: ''
    },
    ref: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'P'
        /*
        P: Pendiente
        A: Aprobado
        C: Cancelado
        R: Rechazado
        */
    }
});

SUPPORT.plugin(timestamp);

export default mongoose.model('support', SUPPORT);