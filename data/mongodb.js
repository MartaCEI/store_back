import mongoose from 'mongoose';
import { DB } from '../config/config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Conectado correctamente")
    } catch (error) {
        console.log("Error conectando a MongooDB", error.message);
        process.exit(1);
    }
}

const productSchema = new mongoose.Schema({
    title: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
        },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    strict: false,
    versionKey: false
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
    strict: false,
    versionKey: false
})

const User = mongoose.model('User', userSchema);
const Email = mongoose.model('Email', emailSchema);

export { connectDB, User, Email };