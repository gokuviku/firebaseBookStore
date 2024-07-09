import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';


const Card = (props) => {
    const firebase = useFirebase()
    const navigate = useNavigate()
    const [url, setUrl] = useState(null)

    useEffect(() => {
        firebase.getImageURL(props.imageURL)
            .then((url) => setUrl(url))
    }, [])

    return (
        <CardGroup>
            <Card style={{ width: '18rem', margin: "25px" }}>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        this book title is {props.name}
                        this book is sold by {props.displayName}
                        this books costs {props.price}
                    </Card.Text>
                    <Button onClick={e => navigate(props.link)} variant="primary">View</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    )

}
export default Card