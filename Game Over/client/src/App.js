import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAll, addOne, updateOne } from './service/gameService';
import { AuthContext } from './contexts/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

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
import { RouteGuard } from './components/RouteGuard/RouteGuard';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage('auth', {});
  const [loader, setLoader] = useState(false);
  const [gamesList, setGameList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getAll()
      .then(gamesList => Object.values(gamesList))
      .then(gamesList => setGameList(gamesList))
      .catch(err => console.log(`Error ${err}`))
  }, []);

  const errorAlert = (error) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
   },3000)
  };

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
      errorAlert(err.message);
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
      navigate('/profile')
    } catch (err) {
      console.log(`Error: ${err}`);
      setLoader(false);
      errorAlert(err.message);
    }
  };

  const valueContext = {
    auth,
    setAuth,
    setGameList,
    userId: auth._id,
    username: auth.username,
    email: auth.email,
    toke: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
    gamesList,
    onEditSubmit,
    onAddNewGameSubmit,
    loader,
    setLoader,
    errorMessage,
    errorAlert
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
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/details/:gameId' element={<Details />} />

          <Route element={<RouteGuard />}>
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:gameId' element={<Edit />} />
          </Route>
          
        </Routes>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;