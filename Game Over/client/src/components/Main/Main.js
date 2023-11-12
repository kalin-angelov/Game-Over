import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAll } from '../../service/gameService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthContext } from '../../contexts/AuthContext';

import { Header } from '../Header/Header';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Logout } from '../Logout/Logout';
import { Create } from '../Create/Create';
import { Catalog } from '../Catalog/Catalog';
import { Edit } from '../Edit/Edit';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { Details } from '../Details/Details';
import { Comments } from '../Comments/Comments';
import { PageNotFound } from '../404/PageNotFound';
import { Footer } from '../Footer/Footer';

import { RouteGuard } from '../RouteGuard/RouteGuard';

export const Main = () => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [gamesList, setGameList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [gameComments, setGameComments] = useState([]);

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
        gameComments,
        setGameComments
    };

    return(
        <AuthContext.Provider value={valueContext}>
            <div className='main'>
                <Header />
                <main className='mainSection'>
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
                </main>
                <Footer />
            </div>
        </AuthContext.Provider>
    )
}