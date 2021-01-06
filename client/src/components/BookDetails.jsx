import {useQuery} from "@apollo/client";
import {getBook} from "../queries/queries";

export const BookDetails = ({bookID}) => {

    const {loading, data} = useQuery(getBook, {
        variables: {
            id: bookID
        }
    })

    if (loading) return <div>loading...</div>

    const {book} = data
    return (
        <div className='selected-book'>
            <h2>Book name: {book.name}</h2>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="other-books">
                {book.author.books.map((book) => {
                    return <li key={book.id}>{book.name}</li>
                })}
            </ul>
        </div>
    )
}