import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from '../components/Card';

const Home = () => {
    const [books, setBooks] = useState([])
    const firebase = useFirebase();
    useEffect(() => {
        firebase.listAllBooks()
            .then((books) => setBooks(books.docs))
            .catch((err) => console.log(err))

    }, [])
    return (
        <div className='container mt-5  '>List Books HERE
            {books.map((book) => (
                <Card key={book.id} id={book.id} {...book.data()} />
            ))}
        </div>
    )
}
export default Home