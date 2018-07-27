import mongoose, { Mongoose } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/andromeda';
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log(`Database connect: ${MONGO_URL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error in database: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected database`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Disconnected database on close app');
        process.exit(0);
    });
});