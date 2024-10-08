import express from "express";
import bookRoutes from './routes/bookRoutes.js';

import {PORT, mongoDBURL} from "./config.js"
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'https://natans-bookstore.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
app.get("/", (request, response) => {
    return response.status(234).send("Welcome to MERN Stack")
});

app.use("/books", bookRoutes)

mongoose.connect(
    mongoDBURL
).then(()=>{
    console.log("App connected to database")
    app.listen(process.env.PORT || PORT, ()=> {
        console.log(`App is listening to port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})