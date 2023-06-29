import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addUser } from './User';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user)
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(addUser({
            name,
            age,
            email,
            id: user[user.length - 1].id + 1
        }))
        navigate('/')
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="name"
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Age </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter email"
                        name="age"
                        onChange={e => setAge(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddUser;