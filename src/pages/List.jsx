import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const ListingPage = () => {
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
            // Optionally, clear the form after successful submission
            setName('');
            setIsbnNumber('');
            setPrice('');
            setCoverPic('');
        } catch (error) {
            console.error('Error creating new listing:', error);
        }
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        value={name}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter Price"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setIsbnNumber(e.target.value)}
                        placeholder="Enter ISBN Number"
                        value={isbnNumber}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cover Pic</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setCoverPic(e.target.files[0])}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Listing
                </Button>
            </Form>
            
            <h1 className="mt-5 mb-5">OR</h1>
            <Button variant="danger" onClick={firebase.signInWithGoogle}>
                Sign Up with Google
            </Button>
        </div>
    );
};

export default ListingPage;
