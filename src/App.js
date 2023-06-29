import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './features/Home';
import AddUser from './features/AddUser';
import View from './component/View';
// import Login from './component/Login';
// import Profil from './component/Profil';
import AddKontakUser from './component/AddKontakUser';
import MyHomeKontak from './myKontak/MyHomeKontak';
import Layoute from './app/Layoute';
import MyAddKontak from './myKontak/MyAddKontak';
import MyEditKontak from './myKontak/MyEditKontak';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/kontakView' element={<View />} />
          <Route path='/addKontak' element={<AddKontakUser />} />
          <Route path='/myKontak' element={<MyHomeKontak />} />
          <Route path='/addmyKontak' element={<MyAddKontak />} />
          <Route path='/editKontak/:id' element={<MyEditKontak />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
