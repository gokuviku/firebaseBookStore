import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const firebase = useFirebase()
    console.log(firebase);
    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/')
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('signing up');
        const res = await firebase.signupUser(email, password)
        console.log('successfull', res);

    }

    return (
        <div className="container mt-5 " >
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email" required />

                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}
export default Register