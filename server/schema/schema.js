import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} from 'graphql'
import Book from '../models/book.js'
import Author from '../models/author.js'

const TBook = new GraphQLObjectType({
    name: 'BookType',
    description: 'This is book type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: TAuthor,
            resolve(parent) {
                return Author.findById(parent.authorID)
            }
        }
    })
})

const TAuthor = new GraphQLObjectType({
    name: 'AuthorType',
    description: 'This is author type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(TBook),
            resolve(parent) {
                return Book.find({authorID: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: TBook,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Book.findById(args.id)
            }
        },
        author: {
            type: TAuthor,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(TBook),
            resolve() {
                return Book.find({}) //Return all books if we pass empty object
            }
        },
        authors: {
            type: new GraphQLList(TAuthor),
            resolve() {
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: TAuthor,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: TBook,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorID: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                })
                return book.save()
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
