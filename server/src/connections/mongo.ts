import mongoose from 'mongoose';

const connectMongo = async (): Promise<void> => {
    const mongoUri = process.env['MONGO_URI'];
    (mongoUri && typeof mongoUri === 'string') ? await mongoose.connect(mongoUri) :
        new Error('Incorrect mongo Uri')
}

export default connectMongo;