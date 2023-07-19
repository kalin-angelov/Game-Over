import styles from './Profile.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { MyGames } from './MyGames';
import { AuthContext } from '../../contexts/AuthContext';
import { getAll, deleteOne } from '../../service/gameService';
import { userGameCheck } from '../../utils/userGameCheck';

export const Profile = () => {
    const {
        auth,
        email,
        userId,
        username,
        setLoader,
        setGameList

    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userGames, setUserGames] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        getAll()
            .then(data => userGameCheck(data, userId))
            .then(data => setUserGames(data))
            .catch(error => console.log(`Error: ${error}`))
    }, [userId]);

    const onDeleteGame = async (id) => {
        setLoader(true);
        try {
            await deleteOne(id, auth.accessToken);

            const games = await getAll();
            setGameList(games);

            const result = userGameCheck(games);
            setUserGames(result);

            onClickCloseDelete();
            setLoader(false);
            navigate('/profile');

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

    return (
        <div className={styles.profile}>
            <div className={styles.user}>
                <h1>Welcome</h1>
                <img src="/images/userPic.png" alt="userPic" />
                <p>Username: { username }</p>
                <p>Email: { email }</p>
                <Link className={styles.createBtn} to='/create'>
                    <i class="fa-solid fa-gavel"></i>
                    Create
                </Link>
            </div>
            <hr />
            <div className={styles.list}>
                <h2>Game's List</h2>

                {(userGames.length > 0) ?
                    <div className={styles.gameList}>
                        {userGames.map(game =>
                            <MyGames
                                key={game._id}
                                game={game}
                                showDelete={showDelete}
                                onDeleteGame={onDeleteGame}
                                onClickShowDelete={onClickShowDelete}
                                onClickCloseDelete={onClickCloseDelete}
                            />
                        )}
                    </div>
                    :
                    <div className={styles.noGames}>
                        <h3>Your List Is Empty</h3>
                        <p> You can change that by clicking on the create button!</p>
                    </div>
                }
            </div>
        </div>
    );
};