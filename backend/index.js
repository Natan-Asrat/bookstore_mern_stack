import express from "express";

import {PORT, mongoDBURL} from "./config.js"
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js'
const app = express();
app.use(express.json())
app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN Stack")
});

app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)
        return response.status(201).send(book);
    }catch (error){
        console.log(error)
        response.status(500).send({message: error.message})
    }
})

app.get("/books", async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error){
        console.log(error)
        response.status(500).send({message: error.message})
    }
})

app.get("/books/:id", async (request, response)=> {
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)
    }catch(error){
        console.log(error)
        return response.status(500).send(error.message)
    }
})

app.put("/books/:id", async (request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body,{ new: true });
        if(!book){
            return response.status(404).json({message: "Book not found"})
        }
        return response.status(200).json(
            book
        )
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message})
    }
})

app.delete("/books/:id", async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(200).send(result)

    }catch(error){
        console.log(error)
        return response.status(500).send({message: error.message})
    }
})

mongoose.connect(
    mongoDBURL
).then(()=>{
    console.log("App connected to database")
    app.listen(PORT, ()=> {
        console.log(`App is listening to port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})