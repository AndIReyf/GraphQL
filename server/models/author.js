import mongoose from 'mongoose'

const {Schema, model} = mongoose

const AuthorSchema = new Schema({
    name: String,
    age: Number
})

export default model('Author', AuthorSchema)
