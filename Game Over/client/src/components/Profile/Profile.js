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
        setLoader,
        setGameList
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userGames, setUserGames] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    
    useEffect(() => {
        getAll()
            .then(data => userGameCheck(data, auth._id))
            .then(data => setUserGames(data))
            .catch(error => console.log(`Error: ${error}`))
    }, [auth._id]);

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
            <div className={styles.userProfile}>
                <div className={styles.userIcons}>
                    <img src="/images/userPic.png" alt="userPic" />
                    <Link className={styles.createBtn} to='/create'>
                        <i className="fa-solid fa-gavel"></i>
                        Create
                    </Link>
                    
                </div>
                <div className={styles.userInformation}>
                    <h1>Welcome:</h1>
                    <hr />
                    <p>Username: <span>{ auth.username }</span></p>
                    <hr />
                    <p>Email: <span>{ auth.email }</span></p>
                    <hr />
                    <p>Created games: <span>{ userGames.length }</span></p>
                    <hr />
                </div>
            </div>
            
            <hr />
            <div className={styles.list}>
                <h2>Game's List</h2>
                {(userGames.length > 0) && <p>If you want to check the details of the game, click on the image.</p>}
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