import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from '../components/Card';
import { messaging } from '../context/Firebase';
import { getToken } from 'firebase/messaging';

const Home = () => {
    const [books, setBooks] = useState([])
    const firebase = useFirebase();
    useEffect(() => {
        firebase.listAllBooks()
            .then((books) => setBooks(books.docs))
            .catch((err) => console.log(err))

    }, [])

    async function reqPermission() {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            //genrate token
            const token = await getToken(messaging, { vapidKey:'GYBOFYCAqKGpOdWdFN9Ek6wpyDuNQOsImBuuT_T3sXY'})
            console.log('genrated',token)  

        } else if (permission === 'denied') {
            alert("you denied the permission")
        }
    }

    useEffect(() => {
        //req user for notification permission.


    }, [])
    return (
        <div className='container mt-5  '>List Books HERE
            {books.map((book) => (
                <Card link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />
            ))}
        </div>
    )
}
export default Home