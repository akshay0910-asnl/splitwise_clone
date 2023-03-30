import mongoose from 'mongoose';

const connectMongo = async ():Promise<void> => {
    try {
        const mongoUri = process.env['MONGO_URI'];
        
        if(mongoUri && typeof mongoUri === 'string'){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            await mongoose.connect(mongoUri);
            
        }
        else{
            throw new Error('Incorrect mongo Uri')
        }
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

export default connectMongo;