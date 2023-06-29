import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllKontak } from './Kontak';
import { Link } from 'react-router-dom';
const View = () => {

    const dispatch = useDispatch()
    const { kontak, isLoading, error } = useSelector((state) => state.kontak)
    console.log(kontak, 'ini kontak data')

    useEffect(() => {
        dispatch(getAllKontak())
    }, [dispatch])

    if (isLoading) {
        return <p className='text-center fs-2 my-5'>Loading . . . </p>
    }
    if (error) {
        return <p>Error yaa!</p>
    }

    return (
        <Container className='my-5'>
            <h1 className='text-center' >Ini data dari fake api</h1>
            <Button className='btn btn-primary'><Link to='/addKontak' className='text-decoration-none text-light '> + Tambah Data</Link></Button>
            <Table striped bordered hover className='my-3'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>telp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        kontak && kontak.map((k, i) =>
                            <tr key={k.id}>
                                <td>{i + 1}</td>
                                <td>{k.id}</td>
                                <td>{k.name}</td>
                                <td>{k.telp}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default View