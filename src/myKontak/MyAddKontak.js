import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { tambahDataKontak } from './MyKontak';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function MyAddKontak() {
    const [name, setName] = useState('')
    const [umur, setUmur] = useState(0)
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [kelamin, setKelamin] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, error} = useSelector((state)=> state.myKontak)
    const handleMyKontak = (event) => {
        event.preventDefault();
        const masukanData = {
            name,
            umur,
            alamat,
            telepon,
            kelamin
        }
        try {
            dispatch(tambahDataKontak(masukanData))
        } catch (error) {
            console.error(error)
        }
        navigate('/myKontak')
    }
    const load = <h4 className='text-center my-5'>Loading . . </h4> 
    const ada = <h4 className='text-center my-5'>Tambah Data</h4> 

    return (
        <Container>
        {error &&  <h4 className='text-center my-5'>Error :{error}</h4> }
        {isLoading ? load : ada }
            <Form onSubmit={handleMyKontak}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter email"
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Umur</Form.Label>
                    <Form.Control
                        type="number"
                        name="umur"
                        placeholder="Enter email"
                        onChange={e => setUmur(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                        type="text"
                        name="alamat"
                        placeholder="Enter email"
                        onChange={e => setAlamat(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telepon</Form.Label>
                    <Form.Control
                        type="number"
                        name="telepon"
                        placeholder="Enter email"
                        onChange={e => setTelepon(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select aria-label="Default select example" name='kelamin' onChange={e => setKelamin(e.target.value)}>
                        <option value='' hidden >Jenis Kelamin</option>
                        <option >Laki Laki</option>
                        <option >Perempuan</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className='my-4'>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default MyAddKontak;