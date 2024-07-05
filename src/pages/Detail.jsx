import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useFirebase } from "../context/Firebase"
import Button from "react-bootstrap/"

const Detail = () => {
    const [data, setData] = useState(null)
    const [url, setUrl] = useState(null)
    const [qty,setQty]=useState(1)

    const params = useParams()
    const firebase = useFirebase()

    useEffect(() => {
        firebase.getBookById(params.bookId)
            .then(value => setData(value.data()))
    }, [])

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL
            firebase.getImageURL(imageURL)
                .then((url) => setUrl)
        }
    }, [data])

    if (data == null) return <h1>Loading...</h1>

    return (
        <div className="container" >
            <h1>{data.name}</h1>
            <img src={url} width="40%" style={{ borderRadius: "10px" }} />
            <h1>Details</h1>
            <p>Price : {data.price}</p>
            <p>ISBN : {data.isbnNumber}</p>
            <h1>Owner Details</h1>
            <p>Name : {data.displayName}</p>
            <p>Email : {data.email}</p>

            
            
            <Button variant ="success" >Buy Now</Button>

        </div>
    )
}
export default Detail