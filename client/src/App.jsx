import {BooksList} from "./components/BooksList";
import {AddBook} from "./components/AddBook";

export const App = () => {
    return (
        <div className="App">
            <BooksList/>
            <AddBook/>
        </div>
    )
}
