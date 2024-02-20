import mongoose from 'mongoose';

const initDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || '';
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI must be provided');
        }
        const dbConection = await mongoose.connect(MONGODB_URI);
        console.log('Database connected');
        return dbConection;
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

export {
    initDB
}