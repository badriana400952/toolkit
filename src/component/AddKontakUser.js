import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addKontak } from './Kontak';
import { useNavigate } from 'react-router-dom';


function AddKontakUser() {
    const [name, setName] = useState('')
    const [telp, setTelp] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.kontak.isLoading)
    const error = useSelector((state) => state.kontak.error)

    // Kemudian, kita menggunakan useDispatch dari react-redux untuk mendapatkan instance dispatch Redux, dan useSelector untuk mendapatkan state dari store, seperti isLoading dan error dari slice user.

    const handleSubmit = (event) => {
        event.preventDefault()
        const untukDikirim = {
            name,
            telp
        }
        dispatch(addKontak(untukDikirim))
        navigate('/kontakView')
    }
    const ppp = <p>Tambah Data Api</p>
    return (
        <Container>
        { error && <p>error : {error}</p>}
        {isLoading ? 'mohon tunggu sebentar..' : ppp }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Telepon</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Number Telepon"
                    name={telp}
                    onChange={e => setTelp(e.target.value)}
                />
            </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            
        </Container>
    );
}

export default AddKontakUser;