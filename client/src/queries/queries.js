import {gql} from '@apollo/client';

// Queries
const getAuthors = gql`{
    authors{
       
        name
        id
    }
}`

const getBooks = gql`{
    books{
        name
        id
    }
}`

const getBook = gql`
    query Book($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    id
                    name
                }
            }
        }
    }
`

// Mutation
const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorID: ID!) {
        addBook(name: $name, genre: $genre, authorID: $authorID) {
            id
            name
        }
  }
`

export {getAuthors, getBooks, ADD_BOOK, getBook}
