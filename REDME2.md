# tutorial react redux toolkit
silahkan di baca

## index.js
buat file store
atau kita bisa gabungkan dengan provider langsung
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './features/User';
import kontakReducer from './component/Kontak';  
import myKontakReducer from './myKontak/MyKontak';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    user: userReducer,
    kontak: kontakReducer,
    myKontak : myKontakReducer,
  }
})

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

```

## Featcures slise
buat file untuk menampug data yang akan di kirim ke store atau slice 

```
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//get data
export const getMyKontak = createAsyncThunk('myKontak/getMyKontak', async () => {
    const response = await fetch("https://649820349543ce0f49e1abaf.mockapi.io/kontak")
    const data = await response.json()
    return data

})
//post data
export const tambahDataKontak = createAsyncThunk('myKontak/tambahDataKontak', async (userMyKontak) => {
    const responseMyKontak = await fetch('https://649820349543ce0f49e1abaf.mockapi.io/kontak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMyKontak)
    })
    const dataMyKontak = responseMyKontak.json()
    return dataMyKontak
})

export const editDataKontak = createAsyncThunk('myKontak/editDataKontak', async (myKontak) => {
    try {
        const responseEdit = await axios.put(`https://649820349543ce0f49e1abaf.mockapi.io/kontak/${myKontak.id}`, myKontak)
        // const dataEdit = await responseEdit.json()
        // return {id : id, data: dataEdit.data}
        return responseEdit.data;
    } catch (error) {
        throw new Error('Gagal memperbarui data.');
    }

})

export const deleteDataKontak = createAsyncThunk('myKontak/deleteDataKontak', async (id) => {
    try {
         await axios.delete(`https://649820349543ce0f49e1abaf.mockapi.io/kontak/${id}`)
        return id
    } catch (error) {
        console.error(error)
    }
})

const myKontakSlise = createSlice({
    name: "myKontak",
    initialState: {
        myKontak: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        //get data
        [getMyKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getMyKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak = action.payload;
        },
        [getMyKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage
        },

        //Post Data
        [tambahDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [tambahDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak.push(action.payload)
        },
        [tambahDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage
        },
        //edit data
        [editDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [editDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myKontak = action.payload;
        },
        [editDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage;
        },
        // delete data
        [deleteDataKontak.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteDataKontak.fulfilled]: (state, action) => {
            state.isLoading = false;
            // state.myKontak = action.payload
        },
        [deleteDataKontak.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.massage;
        },
    }
})


export default myKontakSlise.reducer
```

## view data 
ini data yang akan di tampilkan ke user

```
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
```
## tambah data
```
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
```
## edit Kontak
```
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { editDataKontak } from './MyKontak';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function MyEditKontak() {
    const [name, setName] = useState('')
    const [umur, setUmur] = useState(0)
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [kelamin, setKelamin] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const { isLoading, error } = useSelector((state) => state.myKontak)
    // console.log('ini kontak edit',myKontak)
    // console.log(myKontak)

    // useEffect(() => {
    //     dispatch(getMyKontak())
    // },[dispatch])


    const handleMyKontak = (event) => {
        event.preventDefault();
        const data = {
            id,
            name,
            umur,
            alamat,
            telepon,
            kelamin
        }
        try {
            dispatch(editDataKontak(data))
        } catch (error) {
            console.error(error)
        }
        navigate('/myKontak')
    }
    const load = <h4 className='text-center my-5'>Loading . . </h4>
    const ada = <h4 className='text-center my-5'>Tambah Data</h4>

    return (
        <Container>
            {error && <h4 className='text-center my-5'>Error :{error}</h4>}
            {isLoading ? load : ada}
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
                    <Form.Select aria-label="Default select example"  name='kelamin' onChange={e => setKelamin(e.target.value)}>
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

export default MyEditKontak;
```