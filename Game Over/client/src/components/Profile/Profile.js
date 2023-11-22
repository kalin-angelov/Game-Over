import styles from './Profile.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { getAllGames, deleteGame } from '../../service/gameService';
import { userGameCheck } from '../../utils/userGameCheck';

export const Profile = () => {
    const {
        auth,
        setGameList
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userGames, setUserGames] = useState([]);
    
    useEffect(() => {
        getAllGames()
            .then(data => userGameCheck(data, auth._id))
            .then(data => setUserGames(data))
            .catch(error => console.log(`Error: ${error}`))
    }, [auth._id]);

    const onDeleteGame = async (id) => {
        try {
            await deleteGame(id, auth.accessToken);

            const games = await getAllGames();
            setGameList(games);

            const result = userGameCheck(games);
            setUserGames(result);
            navigate('/profile');

        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };


    return (
        <main className={styles.profile}>
            <section className={styles.userProfile}>
                <img src="/images/userPic.png" alt="User Pic" title='Profile Image'/>
                <Link className={styles.createBtn} to='/create'>
                    <i className="fa-solid fa-gavel"></i>
                    Create
                </Link>
                <ul>
                    <li>Username: <span>{ auth.username }</span></li>
                    <hr />
                    <li>Email: <span>{ auth.email }</span></li>
                    <hr />
                    <li>Created games: <span>{ userGames.length }</span></li>
                    <hr />
                </ul>   
            </section>
            
            <hr />
            {userGames.length > 0 && 
                <section className={styles.list}>
                    <p>User Catalog</p>
                   
                    <article className={styles.userGames}>
                        {userGames.map(game =>
                            <div>
                                <Link to={`/details/${game._id}`} >
                                    <img src={game.imageUrl} alt={game.title} title='Click the image to check the game details' />
                                </Link>
                                <p>
                                    <Link className={styles.gameBtnEdit} to={`/edit/${game._id}`} state={game} >Edit</Link>
                                    <button className={styles.gameBtnDelete} onClick={() => onDeleteGame(game._id)} >Delete</button>
                                </p>
                            </div>
                        )}
                    </article>
                </section>
            }
        </main>
    );
};