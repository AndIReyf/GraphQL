import express from 'express'
import mongoose from 'mongoose'
import {graphqlHTTP} from 'express-graphql'
import {schema} from './schema/schema.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT | 5000
const URI = 'mongodb+srv://Andy:123qweasdzxc@graphql-test.je5ie.mongodb.net/graphql-test?retryWrites=true&w=majority'

app.use(cors())

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.once('open', () => {
    console.log('connected to DB')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log('Server run on port:', PORT))
