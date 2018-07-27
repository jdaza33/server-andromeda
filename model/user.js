import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import timestamp from 'mongoose-timestamp'
const Schema = mongoose.Schema

/*
type_user:
0 -> Admin
1 -> Client
---------------
rol:
0 -> All
*/

const USER = new Schema({
    id_infopersonal: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    type_user: {
        type: Number,
        default: 1
    },
    rol: {
        type: String,
        default: 'ALL'
    },
    ref: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

USER.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

/*USER.pre('update', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});*/

USER.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

USER.plugin(timestamp);

export default mongoose.model('user', USER);