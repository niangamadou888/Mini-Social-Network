import express from "express";
import { PORT } from "./config.js";
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import publicationRoutes from './routes/publicationRoutes.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req,res) =>{
    console.log(req);
    return res.status(234).send("Welcome to MERN Stack Tutorial");

});

app.use('/users', userRoutes);
app.use('/publications', publicationRoutes);

mongoose
    .connect(process.env.MONGODBURL)
    .then(()=>{
        console.log("App connected to database");
        app.listen(PORT, () =>{
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
