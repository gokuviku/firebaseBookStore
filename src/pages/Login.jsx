import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Login = () => {

    const firebase = useFirebase()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('loggin in');
        const res = await firebase.loginUser(email, password)
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
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                   Login
                </Button>
            </Form>
            <h1 className='mt-5 mb-5' >OR</h1>
            <Button variant='danger' onClick={firebase.signInWithGoogle} >Sign Up with Google</Button>
        </div>
    )
}
export default Login

