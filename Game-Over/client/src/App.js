import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAllGames } from './service/gameService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContext } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { Create } from './components/Create/Create';
import { Catalog } from './components/Catalog/Catalog';
import { Edit } from './components/Edit/Edit';
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import { Details } from './components/Details/Details';
import { Comments } from './components/Comments/Comments';
import { PageNotFound } from './components/404/PageNotFound';
import { Footer } from './components/Footer/Footer';
import { RouteGuard } from './components/RouteGuard/RouteGuard';

function App() {

  const [auth, setAuth] = useLocalStorage('auth', {});
  const [gamesList, setGameList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
      getAllGames()
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

  const valueContext = {
      auth,
      setAuth,
      setGameList,
      isAuthenticated: !!auth.accessToken,
      gamesList,
      errorMessage,
      errorAlert,
      searchResult,
      setSearchResult,
  };

  return ( 
    <AuthContext.Provider value={valueContext}>
      <>
        <Header />
          <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/details/:gameId' element={<Details />} />
          <Route path='/comments/:gameId' element={<Comments />} />

          <Route element={<RouteGuard />}>
              <Route path='/logout' element={<Logout />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/create' element={<Create />} />
              <Route path='/edit/:gameId' element={<Edit />} />
          </Route>
          </Routes>
        <Footer />
      </>
  </AuthContext.Provider>
  );
}

export default App;