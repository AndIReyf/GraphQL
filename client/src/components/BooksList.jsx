import {useState} from 'react'
import {useQuery} from '@apollo/client';
import {getBooks} from "../queries/queries";
import {BookDetails} from "./BookDetails";

export const BooksList = () => {

    const {loading, error, data} = useQuery(getBooks)
    const [selectedBook, setSelectedBook] = useState(null)

    const showBookDetails = (bookID) => setSelectedBook(bookID)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <div className='book-list'>
                <h1 className='App-title'>Books Store</h1>
                <ul>
                    {
                        data.books.map(book => (
                            <li key={book.id} onClick={() => showBookDetails(book.id)}>
                                {book.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                selectedBook
                    ? <BookDetails bookID={selectedBook}/>
                    : <div className='selected-book'>No book selected...</div>
            }
        </>
    )
}
