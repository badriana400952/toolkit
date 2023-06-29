import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {

    const user = useSelector((state) => state.user)
    console.log(user)

    return (
        <Container className='mt-5'>
            <h1 className='text-center' >Ini data dari Data Dummy</h1>
            <Button><Link to='/add' className='text-decoration-none text-light mb-5'>+ Create User</Link></Button>
            <Table striped bordered hover className='my-3'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user && user.map((u, i) =>
                            <tr key={u.id}>
                                <td>{i + 1}</td>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.age}</td>
                                <td>{u.email}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default Home;