import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import EventEmitter from 'events';
import dbConnection from './config/dbConfig.js';
import routes from './routes/routes.js'



EventEmitter.defaultMaxListeners = 20;
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/api/auth', routes);

dbConnection();


app.listen(8001, ()=> {
    console.log("Server is running on port");
    
})