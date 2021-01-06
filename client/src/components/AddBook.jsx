import React from 'react'
import {useQuery, useMutation} from '@apollo/client';
import {getAuthors, ADD_BOOK, getBooks} from "../queries/queries";

export const AddBook = () => {

    const {loading, error, data} = useQuery(getAuthors)
    const [addBook] = useMutation(ADD_BOOK)

    const [state, setState] = React.useState({
        name: '', genre: '', authorID: ''
    })

    const changeHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        addBook({
            variables: state,
            refetchQueries: [{query: getBooks}]
        })
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <form id="add-book" onSubmit={submitHandler}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" name='name' onChange={changeHandler}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" name='genre' onChange={changeHandler}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select name='authorID' onChange={changeHandler}>
                    <option>Select Author</option>
                    {
                        data.authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button className='btn-add'>Add</button>
        </form>
    )
}
