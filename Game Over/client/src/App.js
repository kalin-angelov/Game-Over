import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAll, addOne, updateOne, deleteOne } from './service/gameService';
import { register, login } from './service/authService';
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
import { PageNotFound } from "./components/404/PageNotFound"

function App() {
  const navigate = useNavigate();
  const [gamesList, setGameList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    getAll()
      .then(gamesList => setGameList(gamesList))
      .catch(err => console.log(`Error ${err}`))
  }, []);

  const onAddNewGameSubmit = async (e, body) => {
    e.preventDefault();

    body.players = Number(body.players);
    try {
      await addOne(body, auth.accessToken)
      const result = await getAll();

      setGameList(result);
      navigate('/catalog');
    } catch (err) {
      console.log(`Error: ${err}`);
      navigate('/404');
    }
  };

  const onEditSubmit = async (e, body, id) => {
    e.preventDefault();

    body.players = Number(body.players);
    try {
      await updateOne(id, body, auth.accessToken)
      const result = await getAll();

      setGameList(result);
      navigate('/catalog')
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const onClickShowDelete = () => {
    setShowDelete(true);
  };

  const onClickCloseDelete = () => {
    setShowDelete(false);
  };

  const onDeleteGame = async (id) => {
    try {
      await deleteOne(id, auth.accessToken);
      const result = await getAll()

      setGameList(result);
      onClickCloseDelete();
      navigate('/catalog');

    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const onRegister = async (e, body) => {
    e.preventDefault();

    const {rePassword, ...bodyData} = body;

    if (rePassword !== bodyData.password) {
      return;
    }

    try {
      const response = await register(bodyData);

      setAuth(response);

      navigate('/catalog');
    } catch(err) {
      console.log(`Error: ${err}`);
    }
   
  };

  const onLogin = async (e, body) => {
    e.preventDefault();

    try {
      const result = await login(body);

      setAuth(result);

      navigate('/catalog')

      console.log(auth);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const onLogout = () => {
    setAuth({});
  };

  const valueContext = {
    onRegister,
    onLogin,
    onLogout,
    userId: auth._id,
    username: auth.username,
    email: auth.email,
    toke: auth.accessToken,
    isAuthenticated: !!auth.accessToken
  };

  
  return (
    <AuthContext.Provider value={valueContext}>
      <>
        <div className='main'>
          <Header />
          <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile gamesList={gamesList} />} />
            <Route path='/catalog' element={<Catalog gamesList={gamesList} />} />
            <Route path='/create' element={<Create onAddNewGameSubmit={onAddNewGameSubmit} />} />
            <Route path='/edit/:gameId' element={<Edit onEditSubmit={onEditSubmit} />} />
            <Route path='/details/:gameId' element={
              <Details
                onDeleteGame={onDeleteGame}
                onClickShowDelete={onClickShowDelete}
                onClickCloseDelete={onClickCloseDelete}
                showDelete={showDelete}
              />
            } />
          </Routes>

          <Footer />
        </div>
      </>
    </AuthContext.Provider>
  );
}

export default App;
