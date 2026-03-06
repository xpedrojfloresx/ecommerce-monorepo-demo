const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbPassword = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://pedrojflores:${dbPassword}@cluster0.171yqpp.mongodb.net/ecommerce?appName=Cluster0`;

const clientOptions = {
    serverApi: 
    {   version: '1', 
        strict: true, 
        deprecationErrors: true
    }
};

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Base de datos conectada - MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a la base de datos - MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


