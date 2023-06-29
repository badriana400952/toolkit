import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDataKontak, getMyKontak } from './MyKontak';
import { Link } from 'react-router-dom';

function MyHomeKontak() {

  const dispatch = useDispatch()
  const { myKontak, isLoading, error } = useSelector((state) => state.myKontak)
  // console.log('ini kontak', myKontak)

  useEffect(() => {
    dispatch(getMyKontak())
  }, [dispatch])

  if (isLoading) {
    return <p className='text-center fs-2 my-5'>Loading . . . </p>
  }

  if (error) {
    return <p>Error</p>
  }

  const handleDelete = (id) => {
    dispatch(deleteDataKontak(id))
  }

  return (
    <Container>
    
      <h1 className='text-center' >Ini data dari Data Endpoint</h1>
      <Button className='btn btn-primary'><Link to='/addmyKontak' className='text-decoration-none text-light '> + Tambah Data</Link></Button>
      <Table striped className='my-4'>
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Umur</th>
            <th>Alamat</th>
            <th>Telepon</th>
            <th>Jenis Kolemin</th>
            <th>Action</th>
          </tr>
        </thead>

        {Array.isArray(myKontak) ? (
          <tbody>

            {
              myKontak && myKontak.map((my, i) =>
                <tr key={my.id}>
                  <td>{i + 1}</td>
                  <td>{my.id}</td>
                  <td>{my.name}</td>
                  <td>{my.umur}</td>
                  <td>{my.alamat}</td>
                  <td>{my.telepon}</td>
                  <td>{my.kelamin}</td>
                  <td>
                  <Link to={`/editKontak/${my.id}`}>Edit</Link> | <Button onClick={e => handleDelete(my.id)}>Delete</Button>
                  </td>
                </tr>
              )
            }
            </tbody>
        ) : (
          <div>Tidak ada data.</div>
        )}
        
        
      </Table>
    </Container>
  );
}

export default MyHomeKontak;