import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAll, addOne, updateOne, deleteOne } from './service/gameService';
import { AuthContext } from './contexts/AuthContext';

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Logout } from "./components/Logout/Logout";
import { Create } from "./components/Create/Create";
import { Catalog } from "./components/Catalog/Catalog";
import { Edit } from "./components/Edit/Edit";
import { Home } from "./components/Home/Home";
import { Profile } from "./components/Profile/Profile";
import { Details } from "./components/Details/Details";
import { PageNotFound } from "./components/404/PageNotFound";
import { Loader } from "./components/Loader/Loader";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loader, setLoader] = useState(false);
  const [gamesList, setGameList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  

  useEffect(() => {
    getAll()
      .then(gamesList => Object.values(gamesList))
      .then(gamesList => setGameList(gamesList))
      .catch(err => console.log(`Error ${err}`))
  }, []);

  const onAddNewGameSubmit = async (e, body) => {
    e.preventDefault();
    setLoader(true);
    
    body.players = Number(body.players);
    try {
      await addOne(body, auth.accessToken)
      const result = await getAll();

      setGameList(result);
      setLoader(false);
      navigate('/profile');
    } catch (err) {
      console.log(`Error: ${err}`);
      setLoader(false);
      navigate('/404');
    }
  };

  const onEditSubmit = async (e, body, id) => {
    e.preventDefault();
    setLoader(true);

    body.players = Number(body.players);
    try {
      await updateOne(id, body, auth.accessToken)
      const result = await getAll();

      setGameList(result);
      setLoader(false);
      navigate('/catalog')
    } catch (err) {
      console.log(`Error: ${err}`);
      setLoader(false);
    }
  };

  const onClickShowDelete = () => {
    setShowDelete(true);
  };

  const onClickCloseDelete = () => {
    setShowDelete(false);
  };

  const onDeleteGame = async (id) => {
    setLoader(true);
    try {
      await deleteOne(id, auth.accessToken);
      const result = await getAll()

      setGameList(result);
      onClickCloseDelete();
      setLoader(false);
      navigate('/profile');

    } catch (err) {
      console.log(`Error: ${err}`);
      setLoader(false);
    }
  };

  const valueContext = {
    setAuth,
    userId: auth._id,
    username: auth.username,
    email: auth.email,
    toke: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
    gamesList,
    onEditSubmit,
    onAddNewGameSubmit,
    onDeleteGame,
    onClickShowDelete,
    onClickCloseDelete,
    showDelete,
    loader,
    setLoader
  };


  return (
    <AuthContext.Provider value={valueContext}>
      <div className='main'>
        <Loader />
        <Header />
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:gameId' element={<Edit />} />
          <Route path='/details/:gameId' element={<Details />} />
        </Routes>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;