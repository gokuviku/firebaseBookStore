import { useEffect, useState } from "react"
import Card from '../components/Card'
import { useFirebase } from "../context/Firebase"

const ViewOrder = () => {
    const fireBase = useFirebase()
    const [books, setBooks] = useState([])
    useEffect(() => {
        if(fireBase.isLoggedIn)
        fireBase.fetchMyBooks()
            ?.then((books) => setBooks(books))
    }, [fireBase])
    return (
        <div>
            {
                books.map((book) =>
                    (<Card link={`/book/view/${book.id}`} key={books.id} id={book.id} {...book.data()} />))
            }
        </div>
    )
}
export default ViewOrder