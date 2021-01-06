import mongoose from 'mongoose'

const {Schema, model} = mongoose

const BookSchema = new Schema({
    name: String,
    genre: String,
    authorID: String
})

export default model('Book', BookSchema)
